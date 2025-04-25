import MatchCardFlip from '@/components/MatchCardFlip';
import { prisma } from '@/lib/prisma';

/** The Home page. */
const Home = async () => {
  // Fetch a random profile from the database
  const profiles = await prisma.profile.findMany();
  const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];

  return (
    <main>
      {randomProfile ? (
        <MatchCardFlip profile={randomProfile} />
      ) : (
        <p>No profiles found.</p>
      )}
    </main>
  );
};

export default Home;