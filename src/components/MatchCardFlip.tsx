'use client';

import { useState } from 'react';
import { Profile } from '@prisma/client';
import MatchCard from './MatchCard';
import MatchCardBack from './MatchCardBack';

const MatchCardFlip = ({ profile }: { profile: Profile }) => {
  const [showFront, setShowFront] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {showFront ? (
        <MatchCard profile={profile} onFlip={() => setShowFront(false)} />
      ) : (
        <MatchCardBack profile={{ ...profile, classes: [] }} onFlipBack={() => setShowFront(true)} />
      )}
    </div>
  );
};

export default MatchCardFlip;
