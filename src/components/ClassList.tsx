'use client'; 

import { useState } from 'react';

interface ClassListProps {
  label: string;
  classListString?: string | null;
}

const ClassList = ({ label, classListString }: ClassListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const classList = classListString
    ? classListString.split(',').map((item) => item.trim())
    : [];

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isExpanded ? `Hide ${label}` : `Show ${label}`}
      </button>

      {isExpanded && (
        <>
          {classList.length > 0 ? (
            <ul className="list-disc pl-5 mt-3 text-start">
              {classList.map((className, index) => (
                <li key={index}>{className}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No {label.toLowerCase()} listed.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ClassList;
