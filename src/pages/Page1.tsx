import React, { useState } from 'react';
import DiscussionModal from '../components/reusable/discussions/DiscussionModal';
import type { Discussion } from '../components/reusable/discussions/DiscussionsList';

const Page1: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6 relative">
        <h1 className="text-3xl font-bold">Page 1</h1>
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-black rounded hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Discussion
          </button>
          {isModalOpen && (
            <DiscussionModal
              componentId="discussions"
              pageId="page1"
              onClose={() => setIsModalOpen(false)}
              discussions={discussions}
              setDiscussions={setDiscussions}
            />
          )}
        </div>
      </div>
      <div className="mb-8 space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Understanding Reusability in React</h2>
          <p className="mb-4 text-gray-700">Reusability is a core principle in React development that helps create maintainable and efficient applications. Here's why it matters:</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2 text-blue-900">Key Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                <li className="pl-0">Reduced code duplication</li>
                <li className="pl-0">Easier maintenance</li>
                <li className="pl-0">Consistent UI/UX</li>
                <li className="pl-0">Faster development</li>
                </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-2 text-green-900">Best Practices</h3>
              <ul className="space-y-2 text-gray-700">
              <li className="pl-0">Keep components small and focused</li>
              <li className="pl-0">Use proper prop interfaces</li>
              <li className="pl-0">Implement composition patterns</li>
              <li className="pl-0">Follow DRY principles</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="text-lg font-medium mb-2">Implementation Examples</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Component Composition</h4>
                <p className="text-gray-600 text-sm">Break down complex UIs into smaller, reusable pieces that can be composed together.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Custom Hooks</h4>
                <p className="text-gray-600 text-sm">Extract common logic into custom hooks for reuse across components.</p>
              </div>
            </div>
          </div>

          {/* <p className="text-gray-600">Explore our component registry to see reusability in action!</p> */}
        </section>
      </div>
    </div>
  );
};

export default Page1;
