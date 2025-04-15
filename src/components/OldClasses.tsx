'use client'; 

import { useState } from 'react';
import { Button } from 'react-bootstrap';

const OldClassList = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          <li>ICS-242</li>
          <li>ICS-212</li>
          <li>ICS-211</li>
          <li>ICS-111</li>
          <li>Math-242</li>
          <li>Math-241</li>
          <li>Physics 1</li>

        </ul>
      )}
    </div>
  );
};

export default OldClassList;
