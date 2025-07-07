import React from 'react';
import DiscussionsComponent from './DiscussionsComponent';
import type { Discussion } from './DiscussionsList';

interface DiscussionModalProps {
  onClose: () => void;
  componentId: string;
  pageId: string;
  discussions: Discussion[];
  setDiscussions: React.Dispatch<React.SetStateAction<Discussion[]>>;
}

const DiscussionModal: React.FC<DiscussionModalProps> = ({ onClose, componentId, pageId, discussions, setDiscussions }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md p-6 h-[60vh] flex flex-col border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Discussion</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
        <div className="flex-grow overflow-y-auto mt-2">
          <DiscussionsComponent 
            componentId={componentId} 
            pageId={pageId} 
            discussions={discussions}
            setDiscussions={setDiscussions}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscussionModal;
