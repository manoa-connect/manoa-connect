'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { createProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { createProfileSchema } from '@/lib/validationSchemas';

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
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Stuff</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Bio</Form.Label>
                  <input
                    type="textarea"
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Year</Form.Label>
                  <select {...register('year')} className={`form-control ${errors.year ? 'is-invalid' : ''}`}>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="graduate">Graduate</option>
                  </select>
                  <div className="invalid-feedback">{errors.year?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Major</Form.Label>
                  <input
                    type="text"
                    {...register('major')}
                    className={`form-control ${errors.major ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.major?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Likes</Form.Label>
                  <input
                    type="textarea"
                    {...register('likes')}
                    className={`form-control ${errors.likes ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.likes?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>MBTI</Form.Label>
                  <input
                    type="text"
                    {...register('mbti')}
                    className={`form-control ${errors.mbti ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.mbti?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Commute Status</Form.Label>
                  <select {...register('commute')} className={`form-control ${errors.commute ? 'is-invalid' : ''}`}>
                    <option value="dorm">Dorm</option>
                    <option value="commuter">Commuter</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="invalid-feedback">{errors.year?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Current Classes</Form.Label>
                  <input
                    type="textarea"
                    {...register('current')}
                    className={`form-control ${errors.current ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.current?.message}</div>
                </Form.Group>

                <Form.Group>
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

                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProfileForm;
