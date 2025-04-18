'use client';

import { ListGroup, Row, Col  } from 'react-bootstrap';
import { Chat, Profile } from '@prisma/client';
import ChatItem from './ChatItem';
import AddChatForm from './AddChatForm';

const ChatCard = ({ profile, chats, matchs }: { profile: Profile; chats: Chat[], matchs: Profile[] }) => (
  <main className="p-4">
    <Row>
      <Col xs={4}>
            <h5>Matches</h5>
            <ListGroup>
              {matchs.map((match) => (
                <ListGroup.Item key={match.id}>
                  {match.firstName} {match.lastName}
                </ListGroup.Item>
              ))}
            </ListGroup>
      </Col>
      <Col>
        <h2 className="text-center">Your Chats</h2>
        <ListGroup variant="flush">
          {chats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </ListGroup>
        <AddChatForm profile={profile} />
      </Col>
    </Row>
  </main>
);

export default ChatCard;