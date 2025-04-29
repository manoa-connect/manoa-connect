import HomePage from '@/components/UserHome';
import { Profile, Chat} from '@prisma/client';
import { getServerSession } from 'next-auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

/** The Home page. */
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
      include: {
        matches: true,
      },
    });
  
    const chatList = await prisma.chat.findMany();
  
    type ProfileWithMatches = Profile & {
      matches: Profile[]; 
    };

  return (
    <HomePage profile={profile as ProfileWithMatches} chatList = {chatList}/>
  )
};

export default Home;