'use client';
 
import { Profile } from "@prisma/client";

const MatchingCardBack = ({
  onFlipBack,
  profile,
}: {
  onFlipBack: () => void;
  profile: Profile;
}) => {
  return (
    <div>
      <h1>{profile.firstName} {profile.lastName}</h1>
      <button onClick={onFlipBack}>Flip Back</button>
    </div>
  );
};

export default MatchingCardBack;