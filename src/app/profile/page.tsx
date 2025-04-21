import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import UserProfileForm from '@/components/UserProfileForm';
import { Container, Row, Col } from 'react-bootstrap';

/** Loads the profile page for the logged in user. */
const ProfilePage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const email = (session && session.user && session.user.email) || '';
  const profile = await prisma.profile.findUnique({
    where: {
      email,
    },
  });
  // console.log(profile);
  if (!profile) {
    return notFound();
  }

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
              <UserProfileForm profile={profile} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ProfilePage;
