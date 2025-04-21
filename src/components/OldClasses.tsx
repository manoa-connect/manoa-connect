'use client'; 

import { useState } from 'react';
import { Profile } from '@prisma/client'
import { Button } from 'react-bootstrap';

const OldClassList = ({ profile}: { profile: Profile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Safely split the string and trim whitespace
  const classList = profile?.previous?.split(',').map((item: string) => item.trim()) || [];

  return (
    <div>
      <Button
        variant="outline-primary"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Hide List' : 'Show List'}
      </Button>

      {isExpanded && (
        <ul className="list-unstyled mt-3 text-start">
          {classList.map((className: string, index: number) => (
            <li key={index}>{className}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OldClassList;
