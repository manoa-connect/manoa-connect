'use client';

import { signOut } from 'next-auth/react';
import { Button, Col, Row, Container, Image } from 'react-bootstrap';
import logo from '../../../../public/assets/manoa-connect_logo.svg';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Container id="bg-image" className="py-5" fluid style={{ height: '100vh' }}>
    <Col id="signout-page" className="text-center py-5">
      <Col md={6} className="bg-light py-5 justify-content-center d-inline-block">
        <Image src={logo.src} width="30%" alt="" className="text-center" />
        <h2 className="pb-3 text-heavitas">Do you want to sign out?</h2>
        <Row className="px-5 mx-5">
          <Col>
            <Button variant="outline-success" href="/" className="px-5">
              Cancel
            </Button>
          </Col>
          <Col>
            <Button variant="danger" className="px-5" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
              Sign Out
            </Button>
          </Col>
        </Row>
      </Col>
    </Col>
  </Container>
);

export default SignOut;
