import React from 'react';
import DiscussionsComponent from '../components/reusable/discussions/DiscussionsComponent';

const Page2: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Page 2</h1>
      <div className="mb-8">
        <p className="mb-4">This is the content of page 2. Below is our reusable discussion component:</p>
        
        <div className="mt-6">
          <DiscussionsComponent 
            componentId="discussions" 
            pageId="page2" 
            title="Page 2 Discussions" 
          />
        </div>
      </div>
    </div>
  );
};

export default Page2;
