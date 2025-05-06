'use client';

import { Button, Card, Col, Container, Form, Row, Navbar, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Profile } from '@prisma/client';
import { EditProfileSchema } from '@/lib/validationSchemas';
import { editProfile } from '@/lib/dbActions';
import * as Icon from 'react-bootstrap-icons';
import logo from '../../public/assets/manoa-connect_logo.svg';

const onSubmit = async (data: Profile) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editProfile(data);
  swal('Success', 'Your profile has been updated', 'success', {
    timer: 2000,
  });
};

const UserProfileForm = ({ profile }: { profile: Profile }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    resolver: yupResolver(EditProfileSchema),
  });
  // console.log(profile);

  return (
    <Container id="bg-image" fluid>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={10} className="pb-5 mb-5 my-auto px-4">
            <Card border="0" className="px-4">
              <Row className="d-flex pt-4 pb-3">
                <a className="link-success hover-line text-end" href="/profile">
                  <Icon.ArrowLeft className="link-success me-2" />
                  Back to Profile
                </a>
              </Row>
              <Navbar className="justify-content-center align-middle text-center">
                <Image src={logo.src} width="50px" alt="Manoa Connect" className="my-auto" />
                <Navbar.Text className="text-center text-black text-heavitas h1 mt-3 ms-2">Edit Profile</Navbar.Text>
              </Navbar>
              <Form onSubmit={handleSubmit(onSubmit, (formErrors) => console.log(formErrors))}>
                <input type="hidden" {...register('id')} value={profile.id} />

                <Row className="px-3">
                  <Col>
                    <Row>
                      <Col>
                        <Form.Group className="form-group">
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
                      </Col>
                      <Col>
                        <Form.Group className="form-group">
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
                      </Col>
                    </Row>

                    <Row className="py-3">
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
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label><strong>Year</strong></Form.Label>
                          <select
                            {...register('year')}
                            className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                            defaultValue={profile.year}
                          >
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
                        <Form.Group>
                          <Form.Label><strong>Commute Status</strong></Form.Label>
                          <select
                            {...register('commute')}
                            className={`form-control ${errors.commute ? 'is-invalid' : ''}`}
                            defaultValue={profile.commute}
                          >
                            <option value="Dorm">Dorm</option>
                            <option value="Commuter">Commute</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="invalid-feedback">{errors.commute?.message}</div>
                        </Form.Group>
                      </Col>
                      <Col>
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
                      </Col>
                    </Row>

                    <Row className="py-3">
                      <Form.Group>
                        <Form.Label><strong className="text-manoa-green">Clubs</strong></Form.Label>
                        <textarea
                          rows={1}
                          {...register('clubs')}
                          defaultValue={profile.clubs}
                          required
                          className={`form-control ${errors.clubs ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.clubs?.message}</div>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group>
                        <Form.Label>Languages</Form.Label>
                        <textarea
                          {...register('languages')}
                          defaultValue={profile.languages}
                          required
                          className={`form-control ${errors.languages ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.languages?.message}</div>
                      </Form.Group>
                    </Row>
                  </Col>

                  <Col>
                    <Row>
                      <Form.Group>
                        <Form.Label>About Me</Form.Label>
                        <textarea
                          rows={7}
                          {...register('description')}
                          defaultValue={profile.description}
                          required
                          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.description?.message}</div>
                      </Form.Group>
                    </Row>
                    <Row className="pt-3">
                      <Form.Group>
                        <Form.Label>Likes</Form.Label>
                        <textarea
                          rows={7}
                          {...register('likes')}
                          defaultValue={profile.likes}
                          required
                          className={`form-control ${errors.likes ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.likes?.message}</div>
                      </Form.Group>
                    </Row>
                  </Col>
                </Row>

                <input type="hidden" {...register('email')} value={profile.email} />

                <Row className="pt-3 pb-5 px-3">
                  <Col>
                    <Button href="/profile" className="btn btn-danger w-100 py-2">
                      Discard Changes
                    </Button>
                  </Col>
                  <Col>
                    <Button type="submit" className="btn btn-success w-100 py-2">
                      Save Changes
                    </Button>
                  </Col>
                </Row>

              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default UserProfileForm;
