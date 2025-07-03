import React, { useState, useEffect } from 'react';
import { useComponentConfig } from '../../hooks/useComponentConfig';

interface ConfigModalProps {
  componentId: string;
  pageId: string;
  onClose: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ componentId, pageId, onClose }) => {
  const { 
    config, 
    component, 
    toggleElement, 
    isElementEnabled,
    addElement,
    removeElement,
    isAdditionalElement,
    updateHeadingText,
    getHeadingText
  } = useComponentConfig(componentId, pageId);
  
  const [selectedElementToAdd, setSelectedElementToAdd] = useState<string | ''>('');
  const [selectedPositionElement, setSelectedPositionElement] = useState<string | ''>('');
  const [headingText, setHeadingText] = useState(getHeadingText() || 'Discussions');
  
  // Force re-render when configuration changes
  const [, setUpdateCounter] = useState(0);
  
  useEffect(() => {
    // Update heading text when loaded
    setHeadingText(getHeadingText() || 'Discussions');
  }, [getHeadingText]);
  
  if (!component) {
    return null;
  }
  
  const handleToggleElement = (elementId: string) => {
    const element = component.elements.find(e => e.id === elementId);
    
    // Only toggle if it's optional or it's currently disabled and we're enabling it
    if (element && (element.isOptional || !isElementEnabled(elementId))) {
      toggleElement(elementId);
      // Force re-render to update the UI
      setUpdateCounter(count => count + 1);
    }
  };
  
  const handleHeadingTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeadingText(e.target.value);
    updateHeadingText(e.target.value);
  };
  
  const handleAddElement = () => {
    if (selectedElementToAdd) {
      // Extract the actual element ID from the position element if it's an additional element
      let positionElement = selectedPositionElement;
      
      // If the position element ID is from an additional element (has the format 'id-additional-X')
      // Extract the base element ID
      if (positionElement && positionElement.includes('-additional-')) {
        positionElement = positionElement.split('-additional-')[0];
      }
      
      addElement(selectedElementToAdd, positionElement);
      setSelectedElementToAdd('');
      setSelectedPositionElement('');
      // Force re-render to update the UI
      setUpdateCounter(count => count + 1);
    }
  };
  
  const handleRemoveElement = (elementId: string) => {
    removeElement(elementId);
    // Force re-render to update the UI
    setUpdateCounter(count => count + 1);
  };
  
  // Get all visible elements (both default and additional)
  const getVisibleElements = () => {
    // Get the base elements
    const baseElements = component.elements;
    
    // Get additional elements that have been added (may include duplicates of base elements)
    const additionalElementIds = config.additionalElements || [];
    
    // Start with all base elements
    const result: typeof baseElements = [...baseElements];
    
    // Add additional elements that have been added
    additionalElementIds.forEach((elementId, index) => {
      const element = baseElements.find(e => e.id === elementId);
      if (element) {
        // Create a copy of the element with a unique ID for the dropdown
        const additionalElement = {
          ...element,
          id: `${elementId}-additional-${index}`, // Ensure unique ID
          name: `${element.name} (Added ${index + 1})` // Show as "Added" in dropdown
        };
        result.push(additionalElement);
      }
    });
    
    return result;
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md p-6 h-[80vh] flex flex-col border border-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Configure {component.name}</h2>
          <button 
            className="text-gray-500 hover:text-gray-700" 
            onClick={onClose}
          >
            ✖
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">Page: {pageId}</p>
        </div>
        
        {/* Scrollable content area */}
        <div className="flex-grow overflow-y-auto pr-2">
          {/* Heading text input if heading is enabled */}
          {isElementEnabled('heading') && (
            <div className="mb-6 p-3 border rounded-md">
              <label className="block font-medium mb-2">Heading Text</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={headingText}
                onChange={handleHeadingTextChange}
                placeholder="Enter heading text"
              />
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Component Elements</h3>
            <div className="space-y-3">
              {component.elements.map(element => (
                <div 
                  key={element.id} 
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <span>{element.name} {!element.isOptional && 
                    <span className="text-xs text-red-500 ml-1">(Required)</span>
                  }</span>
                  <label className={`inline-flex items-center ${element.isOptional ? 'cursor-pointer' : isElementEnabled(element.id) ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isElementEnabled(element.id)}
                      onChange={() => handleToggleElement(element.id)}
                      disabled={!element.isOptional && isElementEnabled(element.id)}
                    />
                    <div className={`relative w-11 h-6 rounded-full transition-colors peer-disabled:opacity-70 
                      ${isElementEnabled(element.id) ? 'bg-blue-500' : 'bg-gray-200'}`}>
                      <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all transform
                        ${isElementEnabled(element.id) ? 'translate-x-5' : ''}`}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">
                      {isElementEnabled(element.id) ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Additional Elements</h3>
            <div className="space-y-3">
              <div className="flex">
                <select
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  value={selectedElementToAdd}
                  onChange={(e) => setSelectedElementToAdd(e.target.value)}
                >
                  <option value="">Select element to add</option>
                  {component.elements
                    .filter(e => !isAdditionalElement(e.id))
                    .map(element => (
                      <option key={element.id} value={element.id}>
                        {element.name}
                      </option>
                    ))
                  }
                </select>
              </div>
              
              <div className="flex">
                <select
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  value={selectedPositionElement}
                  onChange={(e) => setSelectedPositionElement(e.target.value)}
                >
                  <option value="">Add below (select position)</option>
                  {getVisibleElements().map(element => (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={handleAddElement}
                  disabled={!selectedElementToAdd}
                >
                  Add Element
                </button>
              </div>
            </div>
            
            {config.additionalElements && config.additionalElements.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Added Elements:</h4>
                <ul className="space-y-2">
                  {config.additionalElements.map(elementId => {
                    const element = component.elements.find(e => e.id === elementId);
                    return element ? (
                      <li 
                        key={elementId} 
                        className="flex justify-between items-center p-2 bg-gray-50 rounded-md border border-blue-200"
                      >
                        <span className="font-medium text-blue-700">{element.name}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-red-500 hover:text-red-700 bg-red-50 px-2 py-1 rounded"
                            onClick={() => handleRemoveElement(elementId)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t flex justify-end">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 font-medium"
            onClick={onClose}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
