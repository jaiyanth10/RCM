import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useComponentConfig } from '../../../hooks/useComponentConfig';
import Heading from './Heading';
import TextBox from './TextBox';
import AddButton from './AddButton';
import DiscussionsList, { type Discussion } from './DiscussionsList';

export interface DiscussionsComponentProps {
  componentId: string;
  pageId: string;
  title?: string;
}

const DiscussionsComponent: React.FC<DiscussionsComponentProps> = ({ 
  componentId,
  pageId,
  title = "Discussions" 
}) => {
  const [discussionText, setDiscussionText] = useState('');
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const { isElementEnabled, getHeadingText, config, component } = useComponentConfig(componentId, pageId);

  const handleAddDiscussion = () => {
    if (!discussionText.trim()) return;
    
    const newDiscussion: Discussion = {
      id: uuidv4(),
      text: discussionText,
      timestamp: Date.now()
    };
    
    setDiscussions([...discussions, newDiscussion]);
    setDiscussionText('');
  };
  
  const handleDeleteDiscussion = (id: string) => {
    setDiscussions(discussions.filter(d => d.id !== id));
  };

  // Get the custom heading text from config, or fall back to prop or default
  const headingText = getHeadingText() || title;
  
  // Determine the order of elements to render
  const getElementsToRender = () => {
    if (!component) return [];
    
    // If we have a custom order defined, use that
    if (config.elementOrder && config.elementOrder.length > 0) {
      return config.elementOrder;
    }
    
    // Otherwise use default order plus additionals at the end
    const defaultOrder = component.elements.map(e => e.id);
    const additionalElements = (config.additionalElements || [])
      .filter(id => !defaultOrder.includes(id));
    
    return [...defaultOrder, ...additionalElements];
  };

  // Render a specific element by ID
  const renderElement = (elementId: string, index: number) => {
    if (!isElementEnabled(elementId)) return null;
    
    // Find the component element definition
    if (!component) return null;
    const elementDef = component.elements.find(e => e.id === elementId);
    if (!elementDef) return null;
    
    const ElementComponent = elementDef.component;
    
    // Generate a unique key by combining the elementId with an index
    // This ensures unique keys even when multiple instances of the same element type are rendered
    const uniqueKey = `${elementId}-${index}`;
    
    switch (elementId) {
      case 'heading':
        return <Heading text={headingText} key={uniqueKey} />;
        
      case 'textbox':
        return <TextBox value={discussionText} onChange={setDiscussionText} key={uniqueKey} />;
        
      case 'addButton':
        return (
          <div className="mt-4" key={uniqueKey}>
            <AddButton onClick={handleAddDiscussion} />
          </div>
        );
        
      case 'discussionsList':
        return (
          <div className="mt-6" key={uniqueKey}>
            <DiscussionsList discussions={discussions} onDelete={handleDeleteDiscussion} />
          </div>
        );
        
      // For any additional elements, render the component with default props
      default:
        return <ElementComponent key={uniqueKey} />;
    }
  };

  const elementsToRender = getElementsToRender();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {elementsToRender.map((elementId, index) => renderElement(elementId, index))}
    </div>
  );
};

export default DiscussionsComponent;
