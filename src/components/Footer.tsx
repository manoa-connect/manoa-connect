'use client';

import { Col, Row, Image, Container, Nav, Navbar } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import text_logo from '../../public/assets/manoa-connect_logo-text.svg'


/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const pathName = usePathname();

  return (
    <footer className="mt-auto py-3 bg-manoa-green">
      <Container>
        <Row className="pt-4">
          <Col className="text-start link-light">
            <Row>
              <Navbar>
                <Nav.Link 
                  id="home-nav"href="/profile" 
                  key="home" active={pathName === '/profile'} 
                  className="link-light px-2">
                    <strong>Profile</strong> 
                </Nav.Link>

                <Nav.Link 
                  id="schedule-nav"
                  href="/schedule"
                  key="schedule"
                  active={pathName === '/schedule'}
                  className="link-light px-2 hover-line">
                    <strong>Schedule</strong>
                </Nav.Link>

                <Nav.Link
                  id="map-nav"
                  href="/map"
                  key="map"
                  active={pathName === '/map'}
                  className="link-light px-2 hover-line">
                    <strong>Map</strong>
                </Nav.Link>

                <Nav.Link
                  id="chat-nav"
                  href="/chat"
                  key="chat"
                  active={pathName === '/chat'}
                  className="link-light px-2 hover-line">
                    <strong>Chat</strong>
                </Nav.Link>

                <Nav.Link
                  id="connect-nav"
                  href="/connect-test"
                  key="connect"
                  active={pathName === '/connect'}
                  className="link-light px-2 hover-line">
                    <strong>Connect</strong>
                </Nav.Link>
              </Navbar>
            <hr style={{ width: '70%' }}/>
            Department of Information and Computer Sciences
            <br />
            University of Hawaii | Honolulu, HI 96822
            </Row>
          </Col>

          <Col className="text-end text-light">
            <Navbar.Brand href="/">
              <Image src={text_logo.src} width="300px" alt="Manoa Connect" className="d-inline-block invert pt-3"/>
            </Navbar.Brand>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
export default Footer;
