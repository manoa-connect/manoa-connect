'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { addChat } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddChatSchema } from '@/lib/validationSchemas';
import { Profile } from '@prisma/client';
import { ArrowUpCircle } from 'react-bootstrap-icons';

const AddChatForm = ({ profile }: { profile: Profile }) => {
  const router = useRouter();

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
    router.push('/chat');
  };

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
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="d-flex gap-2 align-items-center">
                  <input
                    type="text"
                    {...register('chat')}
                    className={`form-control ${errors.chat ? 'is-invalid' : ''}`}
                    placeholder="Enter a message"
                  />
                  <div className="invalid-feedback">{errors.chat?.message}</div>
                  <Button type="submit" variant="primary">
                    <ArrowUpCircle />
                  </Button>
                </Form.Group>
                <input type="hidden" {...register('contactId')} value={profile.id} />
                <input type="hidden" {...register('owner')} value={currentUser} />
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddChatForm;
