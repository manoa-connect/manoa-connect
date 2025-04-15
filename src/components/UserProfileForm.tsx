'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserProfile } from '@prisma/client';
import { EditProfileSchema } from '@/lib/validationSchemas';
import { editProfile } from '@/lib/dbActions';

const onSubmit = async (data: UserProfile) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editProfile(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const UserProfileForm = ({ userprofile }: { userprofile: UserProfile }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: yupResolver(EditProfileSchema),
  });
  // console.log(userprofile);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit User Profile</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={userprofile.id} />
                <Form.Group>
                    <Form.Label>Select Your Major</Form.Label>
                    <select
                      {...register('major')}
                      className={`form-control ${errors.major ? 'is-invalid' : ''}`}
                      defaultValue={userprofile.major}
                    >
                      <option value="computerscience">Computer Science</option>
                      <option value="business">Business</option>
                      <option value="engineering">Engineering</option>
                      <option value="arts">Arts</option>
                      <option value="sciences">Sciences</option>
                      <option value="socialsciences">Social Sciences</option>
                    </select>
                    
                    <div className="invalid-feedback">{errors.major?.message}</div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select Your Year</Form.Label>
                    <select
                      {...register('year')}
                      className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                      defaultValue={userprofile.year}
                    >
                      <option value="freshman">Freshman</option>
                      <option value="sophomore">Sophomore</option>
                      <option value="junior">Junior</option>
                      <option value="senior">Senior</option>
                      <option value="graduate">Graduate</option>
                    </select>
                    
                    <div className="invalid-feedback">{errors.year?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={userprofile.owner} />
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
