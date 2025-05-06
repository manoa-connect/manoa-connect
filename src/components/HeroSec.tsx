'use client';

import { Col, Container, Image, Row, Button, Navbar, Nav } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import * as Icon from 'react-bootstrap-icons';
import text_logo from '../../public/assets/manoa-connect_logo-text.svg';
import cover from '../../public/img/cover2.png';

const HeroSec = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;

  return (
    <Container id="hero" fluid>
      <Row className="align-items-center justify-content-center v-middle mx-3">
        <Col className="mx-5">
          <Image src={cover.src} width="100%" className="ms-5 mb-4" />
        </Col>
        <Col className="justify-content-center align-middle text-center me-5">
          <Image src={text_logo.src} width="650px" alt="Manoa Connect" className="invert mt-5" />
          <h3 className="py-2 ps-4 text-light shadow">Connecting made easy.</h3>
          {currentUser ? (
            <>
              <Col />
              <Col>
                <Button className="btn-success my-1 py-2 px-5 m-2 shadow" href="/connect">
                  <Icon.PeopleFill />
                  {' '}
                  Connect
                </Button>
                <Button className="btn-success my-1 py-2 px-5 m-4 shadow" href="/profile">
                  <Icon.PersonFill />
                  {' '}
                  Your Profile
                </Button>
              </Col>
              <Col />
            </>
          ) : (
            <>
              <Button className="btn-success my-1 py-2 px-5" href="/auth/signup">Get Started</Button>
              <Navbar className="justify-content-center align-middle text-center text-light">
                <Navbar.Text className="text-light me-2">Already have an account?</Navbar.Text>
                <Nav.Link className="hover-line" href="/auth/signin">Sign in</Nav.Link>
              </Navbar>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSec;
