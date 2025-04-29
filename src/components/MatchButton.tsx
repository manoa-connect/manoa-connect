'use client';

import { useState, useTransition } from 'react';
import { tryMatch } from '@/lib/dbActions';
import { Button } from 'react-bootstrap';

export default function MatchButton({ matchedId }: { matchedId: number }) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<null | boolean>(null);

  const handleMatch = () => {
    startTransition(async () => {
      const res = await tryMatch(matchedId);
      setResult(res.matched);
    });
  };

  return (
    <>
      <Button
        onClick={handleMatch}
        disabled={isPending}
        variant="success"
        className="corner-button bottom-right btn-lg"
      >
        {isPending ? 'Matching...' : 'Match'}
      </Button>
      {result === true && <p>You both matched!</p>}
      {result === false && <p>You liked them. Waiting for a match back.</p>}
    </>
  );
}
