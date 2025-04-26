import MatchCard from '@/components/MatchCard';
import { getServerSession } from 'next-auth';
import { Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import MatchCardBack from '@/components/MatchCardBack';

const Home = async () => {
    // Protect the page, only logged in users can access it.
    const session = await getServerSession(authOptions);
    loggedInProtectedPage(
      session as {
        user: { email: string; id: string; randomKey: string };
      } | null,
    );
    const email = (session && session.user && session.user.email) || '';
    const profile = await prisma.profile.findUnique({
        where: {
        email,
      },
    });
    
    return (
        <main>
            <Button variant="dark" className="corner-button bottom-left btn-lg">
                Skip
            </Button>
            {profile ? (
              <>
                <MatchCard profile={profile} />
                  <MatchCardBack profile={profile} />
              </>
              ) : (
                <p>No profile found.</p>
            )}
            
            <Button variant="success" className="corner-button bottom-right btn-lg">
                Match
            </Button>
        </main>
    );    
};

export default Home;
