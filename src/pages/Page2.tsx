import React, { useState } from 'react';
import DiscussionModal from '../components/reusable/discussions/DiscussionModal';
import type { Discussion } from '../components/reusable/discussions/DiscussionsList';

const Page2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Page 2</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-black rounded hover:bg-gray-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Discussion
        </button>
      </div>
      <div className="mb-8 space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Avoiding Prop Drilling in React</h2>
          <p className="mb-4 text-gray-700">Prop drilling occurs when props need to be passed through multiple levels of components that don't need those props themselves. Here's how to handle it:</p>

          <div className="bg-orange-50 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium mb-2 text-orange-900">The Problem</h3>
            <p className="text-gray-700">When props are passed through many intermediate components:</p>
            <div className="mt-2 p-3 bg-white rounded border border-orange-200">
              <code className="text-sm text-gray-800">
                ParentComponent → ComponentA → ComponentB → ComponentC
              </code>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-purple-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2 text-purple-900">Solutions</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Context API</li>
                <li>State Management (Redux/Zustand)</li>
                <li>Composition Patterns</li>
                <li>Custom Hooks</li>
              </ul>
            </div>

            <div className="bg-teal-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2 text-teal-900">Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Cleaner component tree</li>
                <li>Better maintainability</li>
                <li>Improved performance</li>
                <li>Easier testing</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-3">Context API Example</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Creating Context</h4>
                <p className="text-gray-600 text-sm">Define a context at a high level in your component tree.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Using Context</h4>
                <p className="text-gray-600 text-sm">Access data directly in any child component using useContext.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {isModalOpen && (
        <DiscussionModal
          componentId="discussions"
          pageId="page2"
          onClose={() => setIsModalOpen(false)}
          discussions={discussions}
          setDiscussions={setDiscussions}
        />
      )}
    </div>
  );
};

export default Page2;
