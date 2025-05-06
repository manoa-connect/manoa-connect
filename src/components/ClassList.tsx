/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */

'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';

interface ClassListProps {
  // label: string;
  classListString?: string | null;
  previewCount?: number;
}

const ClassList = ({ classListString, previewCount = 3 }: ClassListProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const classList = classListString
    ? classListString.split(',').map((item) => item.trim())
    : [];

  const visibleList = isExpanded ? classList : classList.slice(0, previewCount);
  const hasMore = classList.length > previewCount;

  return (
    <div className="mb-4">
      {classList.length > 0 ? (
        <>
          <ul className="list-unstyled mt-2 mb-2 text-center">
            {visibleList.map((className, index) => (
              <li key={index}> {className}</li>
            ))}
          </ul>

          {hasMore && (
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mb-1"
            >
              {isExpanded ? 'Show Less' : `+${classList.length - previewCount} more`}
            </Button>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ClassList;
