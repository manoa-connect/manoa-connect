import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import CreateProfileForm from '@/components/CreateProfileForm';

const CreateProfile = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string; firstName: string; lastName: string;};
    } | null,
  );
  return (
    <main>
      <CreateProfileForm />
    </main>
  );
};

export default CreateProfile;
