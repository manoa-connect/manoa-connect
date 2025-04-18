import { getServerSession } from 'next-auth';
import { Col, Container, Row, Card, Button, CardTitle } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import Link from 'next/link';

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
  /**
  const owner = (session && session.user && session.user.email) || '';
  const stuff = await prisma.stuff.findMany({
    where: {
      owner,
    },
  });
  */
  // console.log(stuff);
  return (
    <main>
      <Container id="home" fluid className="py-3">
        <h2 className='text-center'>User Home Page</h2>
        <Row>
        <Col className='justify-content-start'>
          <Card className='mb-3'>
            <CardTitle>You have XX new matches!</CardTitle>
          </Card>
          <Link href="/chat">
            <Card className='mb-3'>
              <CardTitle>You have XX new messages!</CardTitle>
            </Card>
          </Link>
          <Button href="/connect" className='mb-3'>Connect</Button>
        </Col>
        <Col className="justify-content-end">
          <Card>
            <CardTitle>You have made XX total new friends!</CardTitle>
          </Card>
        </Col>
        </Row>
      </Container>
    </main>
  );
};

export default UserHome;
