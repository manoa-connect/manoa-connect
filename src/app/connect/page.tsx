import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import MatchClient from '@/components/MatchClient';

const Page = async () => {
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
      accepts: true,
      matches: true,
      classes: true,
    },
  });

  if (!currentUserProfile) {
    throw new Error('Profile not found.');
  }

  const likedProfiles = currentUserProfile.accepts.map((p) => p.id);
  const matchedProfileIds = currentUserProfile.matches.map((p) => p.id);

  const otherProfiles = await prisma.profile.findMany({
    where: {
      id: {
        notIn: [currentUserProfile.id, ...matchedProfileIds, ...likedProfiles],
      },
    },
    include: {
      classes: true,
    }
  });

  return <MatchClient otherProfiles={otherProfiles} />;
};

export default Page;
