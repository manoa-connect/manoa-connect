'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addChat } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddChatSchema } from '@/lib/validationSchemas';
import { Profile } from '@prisma/client';

const onSubmit = async (
  data: { chat: string; contactId: number; owner: string },
) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addChat(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const AddChatForm = ({ profile }: { profile: Profile }) => {
  const { data: session, status } = useSession();
  // console.log('AddContactForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddChatSchema),
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
        <Col xs={10}>
          <Col className="text-center">
            <h2>Add Chat</h2>
          </Col>
          <Card>
            <Card.Header>
              Add Timestamped Chat
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Chat</Form.Label>
                  <input
                    type="text"
                    {...register('chat')}
                    className={`form-control ${errors.chat ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.chat?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('contactId')} value={profile.id} />
                <input type="hidden" {...register('owner')} value={currentUser} />
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

export default AddChatForm;
