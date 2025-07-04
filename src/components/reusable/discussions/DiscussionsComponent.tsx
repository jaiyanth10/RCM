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
  const { 
    isElementEnabled, 
    getHeadingText, 
    component,
    getElementsToRender 
  } = useComponentConfig(componentId, pageId);

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

  // Render a specific element by ID
  const renderElement = (elementId: string, index: number) => {
    if (!isElementEnabled(elementId)) return null;
    
    // Extract the base element type from the ID (e.g., "heading-1" -> "heading")
    const elementType = elementId.includes('-') 
      ? elementId.split('-')[0] 
      : elementId;
    
    // Find the component element definition
    if (!component) return null;
    const elementDef = component.elements.find(e => e.id === elementType);
    if (!elementDef) return null;
    
    const ElementComponent = elementDef.component;
    
    // Generate a unique key
    const uniqueKey = `${elementId}-${index}`;
    
    // Render the appropriate element based on its type
    switch (elementType) {
      case 'heading':
        return <Heading text={getHeadingText(elementId) || title} key={uniqueKey} />;
        
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

  // Get the ordered list of elements to render
  const elementsToRender = getElementsToRender();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {elementsToRender.map((elementId, index) => renderElement(elementId, index))}
    </div>
  );
};

export default DiscussionsComponent;
