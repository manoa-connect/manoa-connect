'use client';

import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { $Enums, Class } from '@prisma/client';
import * as Icon from 'react-bootstrap-icons';
import MatchCardFlip from './MatchCardFlip';
import MatchButton from './MatchButton';

type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  year: $Enums.Year;
  major: string;
  likes: string;
  mbti: string;
  commute: $Enums.Commute;
  clubs: string;
  languages: string;
  previous: string;
};

type ProfileWithClasses = Profile & {
  classes: Class[];
};

const MatchClient = ({ otherProfiles }: { otherProfiles: ProfileWithClasses[] }) => {
  const [shownProfiles, setShownProfiles] = useState<number[]>([]);
  const [currentProfile, setCurrentProfile] = useState<ProfileWithClasses | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('shownProfiles');
    if (stored) {
      setShownProfiles(JSON.parse(stored));
    }
  }, []);

  // Choose a profile not shown yet
  useEffect(() => {
    const unseen = otherProfiles.filter((p) => !shownProfiles.includes(p.id));

    if (unseen.length === 0) {
      sessionStorage.removeItem('shownProfiles');
      setShownProfiles([]);
      setCurrentProfile(null);
    } else {
      const random = unseen[Math.floor(Math.random() * unseen.length)];
      setCurrentProfile(random);
    }
  }, [shownProfiles, otherProfiles]);

  const handleSkip = () => {
    if (currentProfile) {
      const updated = [...shownProfiles, currentProfile.id];
      setShownProfiles(updated);
      sessionStorage.setItem('shownProfiles', JSON.stringify(updated));
    }
  };

  return (
    <main>
      <Button
        variant="danger"
        className="corner-button rounded-25 py-1 ms-4 mb-5 pe-4 bottom-left btn-md"
        onClick={handleSkip}
      >
        <Icon.X size="30px" />
        <span className="text-heavitas text-light">
          Skip
        </span>
      </Button>

      {currentProfile ? (
        <>
          <MatchCardFlip profile={currentProfile} />
          <MatchButton matchedId={currentProfile.id} onMatched={handleSkip} />
        </>
      ) : (
        <p className="text-center mt-5">No more profiles. Try refreshing the page.</p>
      )}
    </main>
  );
};

export default MatchClient;
