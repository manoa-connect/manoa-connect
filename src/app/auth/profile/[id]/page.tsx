import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { UserProfile } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import UserProfileForm from '@/components/UserProfileForm';

export default async function UserProfilePage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  // console.log(id);

  /**
  const userprofile: UserProfile | null = await prisma.userProfile.findUnique({
    where: { id },
  });
  */

  const userprofile: UserProfile | null = await prisma.userProfile.findFirst();
  // console.log(stuff);
  if (!userprofile) {
    return notFound();
  }

  return (
    <main>
      <UserProfileForm userprofile={userprofile} />
    </main>
  );
}
