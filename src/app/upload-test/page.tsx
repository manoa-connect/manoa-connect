import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import UploadForm from '@/components/UploadImageForm'

const UploadPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string; firstName: string; lastName: string;};
    } | null,
  );

  return (
    <UploadForm />
  );
};

export default UploadPage;
