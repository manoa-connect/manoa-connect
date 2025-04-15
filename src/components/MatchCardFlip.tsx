'use client';

import { useState } from "react";
import MatchingCard from "./MatchingCard";
import MatchingCardBack from "./MatchingCardBack";

const MatchCardFlip = () => {
  const [showFront, setShowFront] = useState(true);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {showFront ? (
        <MatchingCard onFlip={() => setShowFront(false)} />
      ) : (
        <MatchingCardBack onFlipBack={() => setShowFront(true)} />
      )}
    </div>
  );
};

export default MatchCardFlip;
