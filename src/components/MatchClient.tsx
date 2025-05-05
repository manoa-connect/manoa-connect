'use client';

import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MatchCardFlip from './MatchCardFlip';
import MatchButton from './MatchButton';
import { $Enums } from '@prisma/client';

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
};

const MatchClient = ({ otherProfiles }: { otherProfiles: Profile[] }) => {
  const [shownProfiles, setShownProfiles] = useState<number[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

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
      <Button variant="dark" className="corner-button bottom-left btn-lg" onClick={handleSkip}>
        Skip
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
