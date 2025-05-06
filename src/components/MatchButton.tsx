'use client';

import { useState, useTransition } from 'react';
import { tryMatch } from '@/lib/dbActions';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { on } from 'events';

export default function MatchButton({ matchedId, onMatched }: { matchedId: number; onMatched: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<null | boolean>(null);

  const handleMatchSuccess = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000); // wait 2 seconds
  };

  const handleMatch = () => {
    startTransition(async () => {
      const res = await tryMatch(matchedId);
      setResult(res.matched);
        onMatched();
        window.location.reload();
    });
  };

  return (
    <>
      <Button
        onClick={handleMatch}
        disabled={isPending}
        variant="success"
        className="corner-button rounded-25 py-2 mb-5 me-2 ps-3 pe-4 bottom-right btn-md"
      >
        <Icon.PersonFillAdd size="25px" className="me-2"/>
        <span className="text-heavitas">
          {isPending ? 'Connecting...' : 'Connect'}
        </span>
      </Button>
      {result === true && <p className="text-center">You both matched!</p>}
      {result === false && <p className="text-center">You liked them. Waiting for a match back.</p>}
    </>
  );
}
