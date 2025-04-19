'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Profile } from '@prisma/client';
import { EditProfileSchema } from '@/lib/validationSchemas';
import { editProfile } from '@/lib/dbActions';

const onSubmit = async (data: Profile) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editProfile(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const UserProfileForm = ({ profile }: { profile: Profile }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Profile>({
    resolver: yupResolver(EditProfileSchema),
  });
  // console.log(profile);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Profile</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={profile.id} />
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <input
                    type="text"
                    {...register('firstName')}
                    defaultValue={profile.firstName}
                    required
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <input
                    type="text"
                    {...register('lastName')}
                    defaultValue={profile.lastName}
                    required
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.lastName?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    defaultValue={profile.description}
                    required
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select Your Year</Form.Label>
                    <select
                      {...register('year')}
                      className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                      defaultValue={profile.year}
                    >
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
                    defaultValue={profile.major}
                    required
                    className={`form-control ${errors.major ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.major?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Likes</Form.Label>
                  <textarea
                    {...register('likes')}
                    defaultValue={profile.likes}
                    required
                    className={`form-control ${errors.likes ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.likes?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>MBTI</Form.Label>
                  <input
                    type="text"
                    {...register('mbti')}
                    defaultValue={profile.mbti}
                    required
                    className={`form-control ${errors.mbti ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.mbti?.message}</div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select Your Commuter Status</Form.Label>
                    <select
                      {...register('commute')}
                      className={`form-control ${errors.commute ? 'is-invalid' : ''}`}
                      defaultValue={profile.commute}
                    >
                      <option value="Dorm">Dorm</option>
                      <option value="Commute">Commute</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="invalid-feedback">{errors.commute?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Current Classes</Form.Label>
                  <textarea
                    {...register('current')}
                    defaultValue={profile.current}
                    required
                    className={`form-control ${errors.current ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.current?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Previous Classes</Form.Label>
                  <textarea
                    {...register('previous')}
                    defaultValue={profile.previous}
                    required
                    className={`form-control ${errors.previous ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.previous?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('email')} value={profile.email} />
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

export default UserProfileForm;