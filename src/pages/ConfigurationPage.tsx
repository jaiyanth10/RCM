import React from 'react';
import Configuration from '../components/config-ui/Configuration';

const ConfigurationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Configuration Page</h1>
      <Configuration />
    </div>
  );
};

export default ConfigurationPage;
