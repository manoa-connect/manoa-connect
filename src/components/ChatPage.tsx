'use client';

import { useState } from 'react';
import { ListGroup, Row, Col  } from 'react-bootstrap';
import { Chat, Profile } from '@prisma/client';
import ChatItem from './ChatItem';
import AddChatForm from './AddChatForm';

const ChatCard = ({ profile, chats, matchs }: { profile: Profile, chats: Chat[], matchs: Profile[] }) => {
  const sessionUserEmail = profile.email;
  const currentProfileId = profile.id;

  const [selectedMatch, setSelectedMatch] = useState<Profile | null>(
    matchs.length > 0 ? matchs[0] : null
  );

  const filteredChats = chats.filter(
    (chat) =>
      (chat.contactId === selectedMatch?.id && chat.owner === sessionUserEmail) || 
      (chat.contactId === currentProfileId && chat.owner === selectedMatch?.email) 
  );

  return (
    <main className="p-4">
      <Row>
        <Col xs={4}>
              <h5>Matches</h5>
              <ListGroup>
                {matchs.map((match) => (
                  <ListGroup.Item
                    key={match.id}
                    action
                    active={selectedMatch?.id === match.id}
                    onClick={() => setSelectedMatch(match)}
                  >
                    {match.firstName} {match.lastName}
                  </ListGroup.Item>
                ))}
              </ListGroup>
        </Col>
        <Col>
          <h5 className="text-center">
            {selectedMatch?.firstName} {selectedMatch?.lastName}
          </h5>
          <ListGroup variant="flush">
            {filteredChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </ListGroup>
          {selectedMatch && <AddChatForm profile={selectedMatch} />}
        </Col>
      </Row>
    </main>
  );
};

export default ChatCard;