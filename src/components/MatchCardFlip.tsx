'use client';

import { useState } from 'react';
import { Profile, Class } from '@prisma/client';
import MatchCard from './MatchCard';
import MatchCardBack from './MatchCardBack';

type ProfileWithClasses = Profile & { classes: Class[] };

const MatchCardFlip = ({ profile }: { profile: ProfileWithClasses }) => {
  const [showFront, setShowFront] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {showFront ? (
        <MatchCard profile={profile} onFlip={() => setShowFront(false)} />
      ) : (
        <MatchCardBack profile={profile} onFlipBack={() => setShowFront(true)} />
      )}
    </div>
  );
};

export default MatchCardFlip;
