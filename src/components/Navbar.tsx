'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import logo from '../../public/assets/manoa-connect_logo-text.svg';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as {
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  return (
    <Navbar className="bg-manoa-green" data-bs-theme="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <Image src={logo.src} width="150px" alt="Manoa Connect" className="d-inline-block invert m-2" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser
              ? [
                  <Nav.Link id="home-nav" href="/profile" key="home" active={pathName === '/profile'}>
                    Profile
                  </Nav.Link>,
                  <Nav.Link id="schedule-nav" href="/editSchedule" key="schedule" active={pathName === '/editSchedule'}>
                    Schedule
                  </Nav.Link>,
                  <Nav.Link id="map-nav" href="/map" key="map" active={pathName === '/map'}>
                    Map
                  </Nav.Link>,
                  <Nav.Link id="chat-nav" href="/chat" key="chat" active={pathName === '/chat'}>
                  Chat
                </Nav.Link>,
                <Nav.Link id="connect-nav" href="/connect" key="connect" active={pathName === '/connect'}>
                  Connect
                </Nav.Link>,
              ]
              : ''}
            {currentUser && role === 'ADMIN' ? (
              <Nav.Link id="admin-stuff-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            ) : (
              ''
            )}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" data-bs-theme="light" className="d-inline-block" align="end" title={currentUser}>
                <NavDropdown.Item id="profile-dropdown" href="/profile">
                  <PersonFill className="me-2" />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login" data-bs-theme="light" align="start">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill className="me-2" />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill className="me-2" />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
