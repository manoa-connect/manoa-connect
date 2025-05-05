'use client';

import { Profile } from '@prisma/client';
import { Button } from 'react-bootstrap';

const MatchingCardBack = ({
  onFlipBack,
  profile,
}: {
  onFlipBack: () => void;
  profile: Profile;
}) => (
  <div>
    <h1>
      {profile.firstName}
      {' '}
      {profile.lastName}
    </h1>
    <Button onClick={onFlipBack}>Flip Back</Button>
  </div>
);

export default MatchingCardBack;
