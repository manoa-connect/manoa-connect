'use client';

import { Col, Container, Row, Card, Button, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { Profile, Chat } from '@prisma/client';
import * as Icon from 'react-bootstrap-icons';
import card_image from '../../public/img/hero-img.jpg';

type ProfileWithMatches = Profile & {
  matches: Profile[];
};

const UserHome = ({ profile, chatList }: { profile: ProfileWithMatches; chatList: Chat[] }) => {
  function countUnreadMessages(chatList: Chat[] | undefined, currentUserId: number, currentUserEmail: string): number {
    if (!chatList) return 0;
    return chatList.filter(chat =>
      chat.contactId === currentUserId &&     
      chat.owner !== currentUserEmail &&       
      !chat.isRead                             
    ).length;
  }

  function countMatches(profile: ProfileWithMatches): number {
    return profile.matches.length;
  }

  const unreadCount = countUnreadMessages(chatList, profile.id, profile.email);
  const matchCount = countMatches(profile);

/* TODO(?): Maybe we could add a feature where the user can customize the colors of their profile*/
  return (
    <>
      { profile ? (
        <Container id="bg-image" className="justify-content-center" fluid>
          <Container className="d-flex">
              <Col sm={4} className="bg-white py-5 px-4">
                <Card className="bg-secondary rounded-circle d-block mt-5 mx-auto" style={{width: '150px', height: '150px'}}/>
                  <h1 className='text-center pt-4 text-heavitas'>
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-center text-secondary">
                    {profile.year} | {profile.major} Major
                  </p>
                  <hr className="w-75 mx-auto d-block"/>
                  <p className="pb-1 text-center">
                    {profile.description}
                  </p>
                  <hr className="w-75 mx-auto d-block"/>
                  <p className="pt-1 pb-5 text-center">
                    <strong>Likes:</strong> {profile.likes}
                  </p>
                <Button className="btn-success my-5 pb-2 px-4 mx-auto d-block w-100" href="/editProfile">
                  <Icon.PencilSquare /> Edit Profile
                </Button>
              </Col>

              <Col sm={8} className="py-4 ps-5 d-block align-middle">
                <Row className="my-4 mb-5">
                  <Col>
                    <Card className="border-0">
                      <Card.Header className="bg-success px-5" />
                      <Card.Text className="mx-1 pb-1 pt-4 h6 text-center">
                        <Icon.ChatDotsFill className="me-3" />
                        {unreadCount} new message{unreadCount !== 1 ? 's' : ''}!
                      </Card.Text>
                      <Card.Footer className="text-end">
                        <a href="/chat" className="link-success hover-line">
                          View messages<Icon.ArrowRight className="ms-1 link-success hover-line" />
                        </a>
                      </Card.Footer>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="border-0">
                      <Card.Header className="bg-success px-5" />
                      <Card.Text className="mx-1 pb-1 pt-4 h6 text-center">
                        <Icon.PersonPlusFill className="me-3"/>XX new matches
                      </Card.Text>
                      <Card.Footer className="text-end">
                        <a href="/connect" className="link-success hover-line">
                          Connect<Icon.ArrowRight className="ms-1 link-success hover-line" />
                        </a>
                      </Card.Footer>
                    </Card>
                  </Col>
                
                  <Col>
                    <Card className="border-0">
                      <Card.Header className="bg-success px-5" />      
                      <Card.Text className="mx-1 pb-1 pt-4 h6 text-center">
                        <Icon.PeopleFill className="me-3" /> {matchCount} total friend{matchCount!==1 ? 's' : ''}
                      </Card.Text>
                      <Card.Footer className="text-end">
                        <a href="/chat" className="link-success hover-line">
                          View all chats<Icon.ArrowRight className="ms-1 link-success hover-line" />
                        </a>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>

                <Row className="my-5">
                  <Col>
                    <Card className="border-0">
                      <div style={{overflow: 'scroll', maxHeight: '300px'}}>
                        <Row className="overflow-auto py-3 px-4">
                          {/* TODO: Replace this section with code that iterates through the pictures from a user and displays them in this format */ }
                          <Card className="w-50 border-0 p-3">
                            <Card.Img src={card_image.src} />
                          </Card>

                          <Card className="w-50 border-0 p-3">
                            <Card.Img src={card_image.src} />
                          </Card>
                          <Card className="w-50 border-0 p-3">
                            <Card.Img src={card_image.src} />
                          </Card>
                        </Row>
                      </div>
                      <Card.Footer>
                        <Nav className="float-start text-black py-2 ps-3 text-heavitas">
                          {profile.firstName}'s Photos
                        </Nav>

                        <Nav className="float-end link-dark hover-line py-2 pe-3">
                          Edit
                        </Nav>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>

                <Row className="my-5">
                  <Col>
                    <Card className="border-0">
                      <Card.Header className="bg-success text-light"> 
                        Schedule
                      </Card.Header>
                      <Card.Text className="mx-5 pb-4 pt-4 h6 text-center">
                        TEMPORARY: Add schedule
                      </Card.Text>
                      <Card.Footer className="text-end">
                        <a href="/connect" className="link-success hover-line">
                          Edit Schedule<Icon.ArrowRight className="ms-1 link-success hover-line" />
                        </a>
                      </Card.Footer>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="border-0">
                      <Card.Header className="bg-success px-5 float-start text-light"> 
                        Map
                      </Card.Header>
                      <Card.Text className="mx-5 pb-4 pt-4 h6 text-center">
                        TEMPORARY: Add map
                      </Card.Text>
                      <Card.Footer className="text-end">
                        <a href="/connect" className="link-success hover-line">
                          <Icon.ArrowsAngleExpand className="ms-1 link-success hover-line" />
                        </a>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Col>
          </Container>


          {/*
          <Row>
          <Col md={6} className='d-flex flex-column'>
            <Card className='mb-3 p-3 text-center'>
              <CardTitle>You have XX new matches!</CardTitle>
            </Card>
            <Link href="/chat">
              <Card className='mb-3 p-3 text-center'>
                <CardTitle>You have XX new messages!</CardTitle>
              </Card>
            </Link>
            <Button href="/connect" className="btn-success py-2 px-4 w-100">Connect</Button>
            <Button href="/match" className="btn-success py-2 px-4 w-100">Match</Button>
            <Button href="/chat" className="btn-success py-2 px-4 w-100">Chat</Button>
          </Col>
          <Col md={6} className="d-flex flex-column">
            <Card className='mb-3 p-3 text-center'>
              <CardTitle>You have made XX total new friends!</CardTitle>
            </Card>
          </Col>
          </Row>
        */}
        </Container>
      ) : (
        <p>No profile.</p>
      )
    }
    </>
  );
};

export default UserHome;
