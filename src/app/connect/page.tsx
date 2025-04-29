import { getServerSession } from 'next-auth';
import { Button } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import MatchCardFlip from '@/components/MatchCardFlip';
import { prisma } from '@/lib/prisma';
import MatchButton from '@/components/MatchButton';

const Home = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const email = session?.user?.email || '';

  const currentUserProfile = await prisma.profile.findUnique({
    where: { email },
    include: {
      matches: true,
    },
  });
  
  if (!currentUserProfile) {
    throw new Error('Profile not found.');
  }

  const matchedProfileIds = currentUserProfile.matches.map((p: { id: number }) => p.id);

  const otherProfiles = await prisma.profile.findMany({
    where: {
      id: {
        notIn: [currentUserProfile.id, ...matchedProfileIds], //exclude yourself and matched profiles
      },
    },
  });

  const randomProfile =
    otherProfiles.length > 0
      ? otherProfiles[Math.floor(Math.random() * otherProfiles.length)]
      : null;

  return (
    <main>
      <Button variant="dark" className="corner-button bottom-left btn-lg" href="/connect">
        Skip
      </Button>
      {randomProfile ? (
        <>
          <MatchCardFlip profile={randomProfile} />
        </>
      ) : (
        <p>No other profiles available.</p>
      )}
      <MatchButton matchedId={randomProfile?.id || 0} />
    </main>
  );
};

export default Home;