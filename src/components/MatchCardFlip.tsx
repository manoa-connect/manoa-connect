'use client';

import { useState } from "react";
import MatchingCard from "./MatchingCard";
import MatchingCardBack from "./MatchingCardBack";
import { Profile } from "@prisma/client";

const MatchCardFlip = ({ profile }: { profile: Profile }) => {
  const [showFront, setShowFront] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {showFront ? (
        <MatchingCard onFlip={() => setShowFront(false)} />
      ) : (
        <MatchingCardBack onFlipBack={() => setShowFront(true)} profile={profile} />
      )}
    </div>
  );
};

export default MatchCardFlip;
