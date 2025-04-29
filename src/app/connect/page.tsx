import { getServerSession } from 'next-auth';
import { Button } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import MatchCardFlip from '@/components/MatchCardFlip';
import { prisma } from '@/lib/prisma';

const Home = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const email = session?.user?.email || '';

  // Get all other profiles except the logged-in user
  const otherProfiles = await prisma.profile.findMany({
    where: {
      NOT: {
        email,
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
      <Button variant="success" className="corner-button bottom-right btn-lg">
        Match
      </Button>
    </main>
  );
};

export default Home;