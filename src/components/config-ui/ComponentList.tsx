import React, { useState } from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../../providers/ConfigContext';
import type { ReusableComponent } from '../../types';

interface ComponentListProps {
  component: ReusableComponent;
  onConfigureInstance: (componentId: string, pageId: string) => void;
}

const ComponentList: React.FC<ComponentListProps> = ({ component, onConfigureInstance }) => {
  const { getComponentUsage } = useContext(ConfigContext);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const usages = getComponentUsage(component.id);
  
  return (
    <div className="border rounded-md overflow-hidden border-gray-200 mb-4">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="font-medium">{component.name}</h3>
          <p className="text-sm text-gray-600">{component.description}</p>
        </div>
        <span className="text-xl">{isExpanded ? '▼' : '▶'}</span>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-white">
          <h4 className="font-medium mb-2">Used in pages:</h4>
          
          {usages.length === 0 ? (
            <p className="text-gray-500">Not used in any pages yet.</p>
          ) : (
            <ul className="space-y-2">
              {usages.map(pageId => (
                <li 
                  key={`${component.id}-${pageId}`} 
                  className="flex items-center justify-between"
                >
                  <span>{pageId}</span>
                  <button
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onConfigureInstance(component.id, pageId);
                    }}
                  >
                    Configure
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ComponentList;
