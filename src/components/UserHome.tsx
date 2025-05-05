'use client';

import { Col, Container, Row, Card, Button, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Profile, Chat } from '@prisma/client';
import { loadImg } from '@/lib/supabase/storage/client';
import * as Icon from 'react-bootstrap-icons';
import card_image from '../../public/img/hero-img.jpg';

type ProfileWithMatches = Profile & {
  matches: Profile[];
};

const UserHome = ({ profile, chatList }: { profile: ProfileWithMatches; chatList: Chat[] }) => {
  const [currImgs, setCurrImgs] = useState<string[]>([]);
  useEffect(() => {
      const fetchImages = async () => {
          const { images, error } = await loadImg('manoa-connect-pics', profile.id.toString());

          if (error) {
              console.error(error)
          } else {
              setCurrImgs(images || [])
          }
      };

      fetchImages();
  }, [profile.id]);

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
                      {unreadCount ?
                        <a href="/chat">
                          <Icon.ChatDotsFill className="d-flex me-3 mt-3 justify-content-center align-middle w-100 link-success" style={{width: '100px', height: '100px', color: 'var(--manoa-green)'}} />
                        </a>
                        : 
                        <a href="/chat">
                          <Icon.ChatDotsFill className="d-flex me-3 mt-3 justify-content-center align-middle w-100" style={{width: '100px', height: '100px', color: 'var(--manoa-green)'}} />
                        </a>
                      }
                      <Card.Text className="mx-1 pb-1 pt-4 h6 text-center">
                        {unreadCount} new message{unreadCount !== 1 ? 's' : ''}
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
                      {matchCount ?
                        <a href="/connect">
                          <Icon.PersonPlusFill className="d-flex me-3 mt-3 justify-content-center align-middle w-100 link-success" style={{width: '100px', height: '100px', color: 'var(--manoa-green)'}} />
                        </a>
                        : 
                        <a href="/connect">
                          <Icon.PersonPlusFill className="d-flex me-3 mt-3 justify-content-center align-middle w-100" style={{width: '100px', height: '100px', color: 'var(--manoa-green)'}} />
                        </a>
                      }
                      <Card.Text className="mx-1 pb-1 pt-4 h6 text-center">
                        XX new matches
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
                      {matchCount ?
                        <a href="/chat">
                          <Icon.PeopleFill className="d-flex me-3 mt-3 justify-content-center align-middle w-100 link-success" style={{width: '100px', height: '100px', color: 'var(--manoa-green)'}} />
                        </a>
                        : 
                        <a href="/chat">
                          <Icon.PeopleFill className="d-flex me-3 mt-3 justify-content-center align-middle w-100" style={{width: '100px', height: '100px', color: 'var(--manoa-green)'}} />
                        </a>
                      }
                      <Card.Text className="mx-1 pb-1 pt-4 h6 text-center">
                        {matchCount} total friend{matchCount!==1 ? 's' : ''}
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
                          {currImgs.length > 0 ? (currImgs.map((url, index) => (
                              <Card className="w-50 border-0 p-3">
                                <Card.Img src={url} key={url} />
                              </Card>
                            ))
                          ) : (
                          <p>No images found.</p>
                          )}
                        </Row>
                      </div>
                      <Card.Footer>
                        <Nav className="float-start text-black py-2 ps-3 text-heavitas">
                          {profile.firstName}&apos;s Photos
                        </Nav>

                        <Nav className="float-end link-dark hover-line py-2 pe-3" >
                          <a href='/upload' className="link-dark">Edit</a>
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
        </Container>
      ) : (
        <p>No profile.</p>
      )
    }
    </>
  );
};

export default UserHome;
