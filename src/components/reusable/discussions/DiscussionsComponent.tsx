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
  discussions: Discussion[];
  setDiscussions: React.Dispatch<React.SetStateAction<Discussion[]>>;
}

const DiscussionsComponent: React.FC<DiscussionsComponentProps> = ({ 
  componentId,
  pageId,
  title = "Discussions",
  discussions,
  setDiscussions
}) => {
  const [discussionText, setDiscussionText] = useState('');
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
    <div className="flex flex-col gap-4 p-2 bg-white rounded-lg shadow-sm w-full max-w-xl mx-auto border border-gray-200">
      {elementsToRender.map((elementId, index) => {
        if (elementId.startsWith('heading')) {
          return (
            <div key={elementId + '-' + index} className="text-left">
              {renderElement(elementId, index)}
            </div>
          );
        }
        if (elementId.startsWith('addButton')) {
          return (
            <div key={elementId + '-' + index} className="flex justify-end">
              {renderElement(elementId, index)}
            </div>
          );
        }
        return (
          <div key={elementId + '-' + index}
            className="w-full">
            {renderElement(elementId, index)}
          </div>
        );
      })}
    </div>
  );
};

export default DiscussionsComponent;
