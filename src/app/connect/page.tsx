import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import MatchClient from '@/components/MatchClient';

const Page = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session);

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

  const matchedProfileIds = currentUserProfile.matches.map((p) => p.id);

  const otherProfiles = await prisma.profile.findMany({
    where: {
      id: {
        notIn: [currentUserProfile.id, ...matchedProfileIds],
      },
    },
  });

  return <MatchClient otherProfiles={otherProfiles} />;
};

export default Page;
