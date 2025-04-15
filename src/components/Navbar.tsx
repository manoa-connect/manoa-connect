/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill, Person } from 'react-bootstrap-icons';
import logo from "../../public/assets/manoa-connect_logo-text.svg";
import { prisma } from '@/lib/prisma';
import React from 'react';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  // Fetch user profile only if `currentUser` is a valid string
  const fetchUserProfile = async () => {
    if (!currentUser) return null;
    return await prisma.userProfile.findUnique({
      where: { owner: currentUser },
    });
  };

  const [userProfile, setUserProfile] = React.useState<{ id: number } | null>(null);

  React.useEffect(() => {
    const getUserProfile = async () => {
      const profile = await fetchUserProfile();
      setUserProfile(profile);
    };
    getUserProfile();
  }, [currentUser]);

  const id = userProfile?.id;
  
  return (
    <Navbar className="bg-manoa-green" data-bs-theme="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <Image src={logo.src} width="150px" alt="Manoa Connect" className="d-inline-block invert m-2"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            <Nav.Link id="home-nav" href="/home" key="home" active={pathName === '/home'}>
              Home
            </Nav.Link>
            {currentUser
              ? [
                  <Nav.Link id="add-stuff-nav" href="/add" key="add" active={pathName === '/add'}>
                    Add Stuff
                  </Nav.Link>,
                  <Nav.Link id="list-stuff-nav" href="/list" key="list" active={pathName === '/list'}>
                    List Stuff
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
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-user-profile" href={` /auth/profile/${id} `}>
                  <Person />
                  User Profile
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login" data-bs-theme="light">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
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