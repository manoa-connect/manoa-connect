import UserHome from '@/components/UserHome';
import { getServerSession } from 'next-auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { Profile } from '@prisma/client';

/** The Home page. */
const ProfilePage = async () => {
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
  
  const classData = await prisma.class.findMany({
    where: {
      email,
    },
  }) || '';
  if (!email) {
    notFound();
  }

  const chatList = await prisma.chat.findMany();

  type ProfileWithMatches = Profile & {
    matches: Profile[];
  };

  return (
    <main>
      {profile ? (
        <UserHome profile={profile as ProfileWithMatches} chatList={chatList} classData={classData}/>
      ) : (
        <p>
          No profile found. Please create one
          <a className="link-success ms-1 hover-line" href="/createProfile">here.</a>
        </p>
      )}
    </main>
  );
};

export default ProfilePage;
