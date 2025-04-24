'use client';

import { useSession } from 'next-auth/react';
import { Button, Navbar, Col, Container, Form, Row, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { createProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { createProfileSchema } from '@/lib/validationSchemas';
import logo from "../../public/assets/manoa-connect_logo.svg";

const onSubmit = async (data: { 
  firstName: string; 
  lastName: string; 
  email: string;
  description: string;
  year: string;
  major: string;
  likes: string;
  mbti: string;
  commute: string;
  current: string;
  previous: string; 
}) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await createProfile(data);
  swal('Success', 'Your profile has been created', 'success', {
    timer: 2000,
  });
};

const CreateProfileForm: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('createProfileForm', status, session);
  const currentUser = session?.user?.email || '';
  const currentFirstName = session?.user?.firstName || '';
  const currentLastName = session?.user?.lastName || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createProfileSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container id="bg-image" fluid>
      <Container className="py-5">
        <Row className="justify-content-center pt-3">
          <Col xs={5} className="bg-white pb-5 mb-5 my-auto px-4">
            <Navbar className="pt-5 justify-content-center align-middle text-center">
              <Image src={logo.src} width="50px" alt="Manoa Connect" className="my-auto"/>
              <Navbar.Text className="text-center text-black text-heavitas h1 mt-4 ms-2">Create Profile</Navbar.Text>
            </Navbar>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="form-group px-3">
                <Form.Label>Bio</Form.Label>
                <textarea
                  rows={3}
                  {...register('description')}
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                />
                
                <div className="invalid-feedback">{errors.description?.message}</div>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="form-group ps-3 py-3">
                    <Form.Label>Year</Form.Label>
                    <select {...register('year')} className={`form-control ${errors.year ? 'is-invalid' : ''}`}>
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                    <div className="invalid-feedback">{errors.year?.message}</div>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="form-group pe-3 py-3">
                    <Form.Label>Major</Form.Label>
                    <input
                      type="text"
                      {...register('major')}
                      className={`form-control ${errors.major ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.major?.message}</div>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="form-group pt-0 p-3">
                <Form.Label>Likes</Form.Label>
                <input
                  type="textarea"
                  {...register('likes')}
                  className={`form-control ${errors.likes ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.likes?.message}</div>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="form-group ps-3 py-3">
                    <Form.Label>MBTI</Form.Label>
                    <input
                      type="text"
                      {...register('mbti')}
                      className={`form-control ${errors.mbti ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.mbti?.message}</div>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="form-group pe-3 py-3">
                    <Form.Label>Commute Status</Form.Label>
                    <select {...register('commute')} className={`form-control ${errors.commute ? 'is-invalid' : ''}`}>
                      <option value="Dorm">Dorm</option>
                      <option value="Commuter">Commuter</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="invalid-feedback">{errors.year?.message}</div>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="form-group pt-0 p-3">
                <Form.Label>Current Classes</Form.Label>
                <input
                  type="textarea"
                  {...register('current')}
                  className={`form-control ${errors.current ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.current?.message}</div>
              </Form.Group>

              <Form.Group className="form-group pt-0 p-3">
                <Form.Label>Previous Classes</Form.Label>
                <input
                  type="textarea"
                  {...register('previous')}
                  className={`form-control ${errors.previous ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.previous?.message}</div>
              </Form.Group>

              <input type="hidden" {...register('firstName')} value={currentFirstName} />
              <input type="hidden" {...register('lastName')} value={currentLastName} />
              <input type="hidden" {...register('email')} value={currentUser} />

              <Row>
                <Col className="justify-content-end d-flex">
                  <a type="button" onClick={() => reset()} className="link-danger text-end pe-2 pt-3 hover-line">
                        Reset Form
                  </a>
                </Col>
              </Row>
              <Container className="px-3 pt-4">
                <Row>
                  <Button type="submit" className="btn btn-success">
                    Create
                  </Button>
                </Row>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default CreateProfileForm;
