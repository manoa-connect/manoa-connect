import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import ScheduleForm from '@/components/ScheduleForm';

/** Loads the profile page for the logged in user. */
const EditSchedulePage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  
  const email = (session && session.user && session.user.email) || '';
  const classData = await prisma.class.findMany({
    where: {
      email,
    },
  }) || '';
  if (!email) {
    notFound();
  }
  // console.log(classData);

  return (
    <main>
      <ScheduleForm classData={classData}/>
    </main>
  );
};

export default EditSchedulePage;
