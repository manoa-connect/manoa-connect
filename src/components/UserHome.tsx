import { getServerSession } from 'next-auth';
import { Col, Container, Row, Card, Button, CardTitle } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';
import { PeopleFill } from 'react-bootstrap-icons';
import { prisma } from '@/lib/prisma';
// import { prisma } from '@/lib/prisma';

/** Render a list of stuff for the logged in user. */
const UserHome = async () => {
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
    include: {
      acceptedBy: true,
      matches: true,
    },
  });

  const chats = await prisma.chat.findMany({
    where: {
      OR: [
        { owner: email },
        { contactId: profile?.id },
      ],
    },
  });
  const filteredChats = chats.filter(
    (chat) =>
      (chat.owner !== session?.user?.email) &&
      (chat.contactId === profile?.id) 
  );
  // console.log(stuff);
  return (
    <main>
      <Container id="home" fluid className="py-4 px-3">
        <h2 className='text-center mb-4'>Welcome {profile?.firstName}!</h2>
        <Row>
        <Col md={6} className='d-flex flex-column'>
          <Card className='mb-3 p-3 text-center'>
            <CardTitle>You have {profile?.matches.length} new matches!</CardTitle>
          </Card>
          <Link href="/chat">
            <Card className='mb-3 p-3 text-center'>
              <CardTitle>You have {filteredChats.length} new messages!</CardTitle>
            </Card>
          </Link>
          <Button href="/connect" className="btn-success py-2 px-4 w-100">Connect</Button>
          <Button href="/match" className="btn-success py-2 px-4 w-100">Match</Button>
          <Button href="/chat" className="btn-success py-2 px-4 w-100">Chat</Button>
        </Col>
        <Col md={6} className="d-flex flex-column">
          <Card className='mb-3 p-3 text-center'>
            <CardTitle>You have made {profile?.acceptedBy.length} total new friends!</CardTitle>
          </Card>
          <Button className="btn-success py-2 px-4 w-100" href="/editProfile">
            <PeopleFill /> Edit Profile
          </Button>
        </Col>
        </Row>
      </Container>
    </main>
  );
};

export default UserHome;
