import { getServerSession } from 'next-auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import UploadForm from '@/components/UploadImageForm'


const UploadPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string; firstName: string; lastName: string;};
    } | null,
  );

  const email = session?.user?.email;

  if (!email) {
    return <main className="p-4">Please log in to view your photos.</main>;
  }

  const profile = await prisma.profile.findUnique({
    where: { email }
  });

  if (!profile) {
    return <main className="p-4">Please create a profile to view your photos.</main>;
  }

  return (
    <UploadForm profile={profile}/>
  );
};

export default UploadPage;
