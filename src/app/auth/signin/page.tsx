'use client';

import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row, Image, Navbar } from 'react-bootstrap';
import logo from "../../../../public/assets/manoa-connect_logo.svg";

/** The sign in page. */
const SignIn = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const result = await signIn('credentials', {
      callbackUrl: '/list',
      email,
      password,
    });

    if (result?.error) {
      console.error('Sign in failed: ', result.error);
    }
  };

  return (
    <main>
      <Container id="bg-image" fluid>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col xs={5} className="bg-white pb-5 mb-5 my-auto">
              <Navbar className="pt-5 justify-content-center align-middle text-center">
                <Image src={logo.src} width="50px" alt="Manoa Connect" className="my-auto"/>
                <Navbar.Text className="text-center text-black text-heavitas h1 mt-4 ms-2">Login</Navbar.Text>
              </Navbar>
              <Form method="post" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="form-group px-3">
                  <Form.Label className="text-black">Email</Form.Label>
                  <input name="email" type="text" className="form-control" />
                </Form.Group>
                <Form.Group className="p-3">
                  <Form.Label className="text-black">Password</Form.Label>
                  <input name="password" type="password" className="form-control" />
                </Form.Group>
                <Container>
                  <Row className="justify-content-center pt-2 px-3">
                      <Button type="submit" className="mt-3 btn-success">
                          Login
                      </Button>
                  </Row>
                </Container>
              </Form>
              <Card.Footer className="text-center text-black pt-3 mb-5 pb-2">
                Don&apos;t have an account?
                <a href="/auth/signup" className="ps-2 link-success hover-line">Sign Up</a>
              </Card.Footer>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default SignIn;
