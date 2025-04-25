'use client'; 

import { useState } from 'react';
import { Profile } from '@prisma/client'
import { Button } from 'react-bootstrap';

const OldClassList = ({ profile}: { profile: Profile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Safely split the string and trim whitespace
  const classList = profile?.previous?.length
  ? profile.previous.split(',').map((item: string) => item.trim())
  : [];
  console.log("Previous classes string:", profile?.previous);

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
  <>
    {classList.length > 0 ? (
      <ul className="list-unstyled mt-3 text-start">
        {classList.map((className: string, index: number) => (
          <li key={index}>{className}</li>
        ))}
      </ul>
    ) : (
      <p className="text-muted">No previous classes listed.</p>
    )}
  </>
      )}
    </div>
  );
};

export default OldClassList;
