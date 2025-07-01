import React, { useState } from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../../providers/ConfigContext';
import ComponentList from './ComponentList';
import ConfigModal from './ConfigModal';

const ConfigPanel: React.FC = () => {
  const { components } = useContext(ConfigContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('');
  const [selectedPage, setSelectedPage] = useState('');
  
  const handleOpenConfig = (componentId: string, pageId: string) => {
    setSelectedComponent(componentId);
    setSelectedPage(pageId);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedComponent('');
    setSelectedPage('');
  };
  
  return (
    <div className="p-4 bg-white rounded-lg ">
      <h2 className="text-2xl font-bold mb-6">Reusable Components Configuration</h2>
      
      {components.length === 0 ? (
        <p className="text-gray-500">No reusable components registered yet.</p>
      ) : (
        <div className="space-y-4">
          {components.map((component) => (
            <ComponentList
              key={component.id}
              component={component}
              onConfigureInstance={handleOpenConfig}
            />
          ))}
        </div>
      )}
      
      {isModalOpen && selectedComponent && selectedPage && (
        <ConfigModal
          componentId={selectedComponent}
          pageId={selectedPage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ConfigPanel;
