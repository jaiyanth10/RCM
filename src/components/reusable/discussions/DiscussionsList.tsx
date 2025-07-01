import React from 'react';

export interface Discussion {
  id: string;
  text: string;
  timestamp: number;
}

interface DiscussionsListProps {
  discussions: Discussion[];
  onDelete?: (id: string) => void;
}

const DiscussionsList: React.FC<DiscussionsListProps> = ({ discussions, onDelete }) => {
  if (discussions.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center border rounded-md">
        No discussions yet. Add one above!
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden max-h-[300px] overflow-y-auto">
      {discussions.map((discussion) => (
        <div key={discussion.id} className="p-3 border-b last:border-b-0 flex justify-between items-start">
          <div>
            <p className="text-gray-800">{discussion.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(discussion.timestamp).toLocaleString()}
            </p>
          </div>
          {onDelete && (
            <button 
              className="text-red-500 hover:text-red-700" 
              onClick={() => onDelete(discussion.id)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DiscussionsList;
