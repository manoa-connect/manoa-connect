import MatchCard from '@/components/MatchCard';
import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import MatchCardBack from '@/components/MatchCardBack';

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

  // Pick one at random
  const randomProfile =
    otherProfiles.length > 0
      ? otherProfiles[Math.floor(Math.random() * otherProfiles.length)]
      : null;

  return (
    <main>
      <Button variant="dark" className="corner-button bottom-left btn-lg">
        Skip
      </Button>
      {randomProfile ? (
        <>
          <MatchCard profile={randomProfile} />
          <MatchCardBack profile={randomProfile} />
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