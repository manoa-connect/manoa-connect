'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row, Navbar, Image } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';
import logo from "../../../../public/assets/manoa-connect_logo.svg";

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  // acceptTerms: boolean;
};

/** The sign up page. */
const SignUp = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    // console.log(JSON.stringify(data, null, 2));
    await createUser(data);
    // After creating, signIn with redirect to the add page
    await signIn('credentials', { callbackUrl: '/createProfile', ...data });
  };

  return (
    <main>
      <Container id="bg-image" fluid>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col xs={5} className="bg-white pb-5 mb-5 my-auto">
              <Navbar className="pt-5 justify-content-center align-middle text-center">
                <Image src={logo.src} width="50px" alt="Manoa Connect" className="my-auto"/>
                <Navbar.Text className="text-center text-black text-heavitas h1 mt-4 ms-2">Sign Up</Navbar.Text>
              </Navbar>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col>
                        <Form.Group className="form-group ps-3">
                        <Form.Label>First Name</Form.Label>
                        <input
                          type="text"
                          {...register('firstName')}
                          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                      </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className="form-group pe-3">
                        <Form.Label>Last Name</Form.Label>
                        <input
                          type="text"
                          {...register('lastName')}
                          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                      </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="form-group p-3">
                      <Form.Label>Email</Form.Label>
                      <input
                        type="text"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.email?.message}</div>
                    </Form.Group>

                    <Form.Group className="form-group pt-0 p-3">
                      <Form.Label>Password</Form.Label>
                      <input
                        type="password"
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.password?.message}</div>
                    </Form.Group>
                    <Form.Group className="form-group px-3 pt-0 pb-2">
                      <Form.Label>Confirm Password</Form.Label>
                      <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </Form.Group>
                    <Row>
                      <Col md={{span: 3, offset: 9}}>
                        <span onClick={() => reset()} className="link-danger text-end pe-2 pt-3 hover-line">
                              Reset Form
                        </span>
                      </Col>
                    </Row>
                    <Container className="px-3 pt-4">
                      <Row>
                          <Button type="submit" className="btn btn-success">
                            Register
                          </Button>
                      </Row>
                    </Container>
                  </Form>
                <Card.Footer className="text-center text-black pt-3 mb-5 pb-2">
                  Already have an account?
                  <a href="/auth/signin" className="ps-2 link-success hover-line">Sign in</a>
                </Card.Footer>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default SignUp;
