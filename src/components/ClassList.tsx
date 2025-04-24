'use client'; 

import { useState } from 'react';
import { Profile } from '@prisma/client'
import { Button } from 'react-bootstrap';

interface ClassListProps {
  label: string;
  classListString?: string | null;
  previewCount?: number;
}

const ClassList = ({ label, classListString, previewCount = 3 }: ClassListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const classList = classListString
    ? classListString.split(',').map((item) => item.trim())
    : [];

  const visibleList = isExpanded ? classList : classList.slice(0, previewCount);
  const hasMore = classList.length > previewCount;

  return (
    <div className="mb-4">
      <h5 className="mb-2">{label}</h5>

      {classList.length > 0 ? (
        <>
          <ul className="list-unstyled mt-3 text-start">
            {visibleList.map((className, index) => (
              <li key={index}> {className}</li>
            ))}
          </ul>

          {hasMore && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2"
            >
              {isExpanded ? 'Show Less' : `+${classList.length - previewCount} more`}
            </Button>
          )}
        </>
      ) : (
        <p className="text-muted">No {label.toLowerCase()} listed.</p>
      )}
    </div>
  );
};

export default ClassList;
