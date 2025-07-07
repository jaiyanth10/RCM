import React, { useState } from 'react';
import { useComponentConfig } from '../../hooks/useComponentConfig';

interface ConfigModalProps {
  componentId: string;
  pageId: string;
  onClose: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ componentId, pageId, onClose }) => {
  const {
    component,
    toggleElement,
    isElementEnabled,
    addElement,
    removeElement,
    updateHeadingText,
    getHeadingText,
    getElementsToRender
  } = useComponentConfig(componentId, pageId);
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [editingHeadingId, setEditingHeadingId] = useState<string | null>(null);
  const [editTexts, setEditTexts] = useState<Record<string, string>>({});

  if (!component) return null;

  const handleToggleElement = (elementId: string) => {
    toggleElement(elementId);
  };

  const handleStartEditing = (elementId: string) => {
    setEditingHeadingId(elementId);
    setEditTexts(prev => ({
      ...prev,
      [elementId]: getHeadingText(elementId) || 'Discussions'
    }));
  };

  const handleSaveHeading = () => {
    if (editingHeadingId && editTexts[editingHeadingId]?.trim()) {
      updateHeadingText(editingHeadingId, editTexts[editingHeadingId].trim());
    }
    setEditingHeadingId(null);
    setEditTexts({});
  };

  const handleCancelEditing = () => {
    setEditingHeadingId(null);
    setEditTexts({});
  };

  const handleAddElement = () => {
    if (selectedElement && selectedPosition) {
      addElement(selectedElement, selectedPosition);
      setSelectedElement('');
      setSelectedPosition('');
    }
  };

  // Get all current elements in order
  const currentElements = getElementsToRender();
  console.log('Current Elements:', currentElements);
  // Get the element name from its ID
  // const getElementName = (elementId: string) => {
  //   const baseId = elementId.includes('-') ? elementId.split('-')[0] : elementId;
  //   return component.elements.find(e => e.id === baseId)?.name || '';
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md p-6 h-[80vh] flex flex-col border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Configure {component.name}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <div className="flex flex-col flex-1 min-h-0">
          {/* Original and Additional Elements */}
          <div className="flex-1 overflow-y-auto mb-4">
            <div className="space-y-3">
              {currentElements.map(elementId => (
                <div key={elementId} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2 flex-grow">
                    <span className="min-w-[100px]">{elementId}</span>
                    {elementId.startsWith('heading') && (
                      <div className="flex items-center gap-2 max-w-[200px]">
                        {editingHeadingId === elementId ? (
                          <>
                            <input
                              type="text"
                              maxLength={40}
                              className="w-full px-2 py-1 border rounded text-sm"
                              value={editTexts[elementId] || ''}
                              onChange={(e) => setEditTexts(prev => ({
                                ...prev,
                                [elementId]: e.target.value
                              }))}
                              autoFocus
                            />
                            <button
                              className="text-green-600 hover:text-green-700 px-1"
                              onClick={handleSaveHeading}
                            >
                              ✔
                            </button>
                            <button
                              className="text-gray-400 hover:text-gray-600 px-1"
                              onClick={handleCancelEditing}
                            >
                              ✖
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-gray-600 text-sm truncate">"{getHeadingText(elementId)}"</span>
                            <button
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => handleStartEditing(elementId)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isElementEnabled(elementId)}
                        onChange={() => handleToggleElement(elementId)}
                      />
                      <div className={`relative w-11 h-6 rounded-full transition-all duration-200 ease-in-out
                      ${isElementEnabled(elementId) ? 'bg-blue-500' : 'bg-gray-200'}`}>
                        <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transform transition-transform duration-200 ease-in-out
                        ${isElementEnabled(elementId) ? 'translate-x-5' : 'translate-x-0'}`}>
                        </div>
                      </div>
                    </label>
                    {elementId.includes('-') && (
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => removeElement(elementId)}
                      >
                        ✖
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Element Section */}
          <div className="mt-auto">
            <h3 className="font-medium mb-3">Add New Element</h3>
            <div className="space-y-3">
              <div>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedElement}
                  onChange={(e) => setSelectedElement(e.target.value)}
                >
                  <option value="">Select element type...</option>
                  {component.elements.map(element => (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  className="w-full p-2 border rounded [&>option]:py-2 [&>option]:px-2"
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  size={4}
                  style={{ maxHeight: '120px' }}
                >
                  <option value="" className='sticky '>Select position...</option>
                  {currentElements.map(elementId => (
                    <option key={elementId} value={elementId}>
                      After ({elementId})
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddElement}
                disabled={!selectedElement || !selectedPosition}
              >
                Add Element
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
