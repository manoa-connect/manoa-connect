'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { addChat } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddChatSchema } from '@/lib/validationSchemas';
import { Profile } from '@prisma/client';
import { SendFill } from 'react-bootstrap-icons';

const AddChatForm = ({ profile, onNewChat }: { profile: Profile; onNewChat: () => void }) => {
  const { data: session, status } = useSession();
  // console.log('AddContactForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(AddChatSchema),
  });

  useEffect(() => {
    setValue('contactId', profile.id);
  }, [profile.id, setValue]);

  const onSubmit = async (
    data: { chat: string; contactId: number; owner: string },
  ) => {
    // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
    await addChat(data);
    reset();
    if (onNewChat) onNewChat();
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="pt-3">
      <Row className="justify-content-center">
        <Card>
          <Card.Body className="chat-form-body">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="d-flex align-items-center mb-0">
                <input
                  type="text"
                  {...register('chat')}
                  className={`form-control ${errors.chat ? 'is-invalid' : ''}`}
                  placeholder="Enter a message"
                />
                <div className="invalid-feedback">{errors.chat?.message}</div>
                <Button type="submit" className="ms-3" variant="outline-success">
                  <SendFill />
                </Button>
              </Form.Group>
              <input type="hidden" {...register('contactId')} value={profile.id} />
              <input type="hidden" {...register('owner')} value={currentUser} />
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default AddChatForm;
