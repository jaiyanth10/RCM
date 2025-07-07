import React, { useRef, useEffect } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="absolute right-0 mt-2 z-5">
      {/* Arrow at the top of the popover */}
      <div className="flex justify-end pr-6">
        <div className="w-4 h-4 bg-white border-t border-l border-gray-300 rotate-45 -mb-2 mr-4"></div>
      </div>
      <div ref={modalRef} className="bg-white rounded-lg w-[450px] h-[500px] p-6 shadow-xl border border-gray-300 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Discussion</h2>
        </div>
        <div className="flex-1 overflow-y-auto mt-2">
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
