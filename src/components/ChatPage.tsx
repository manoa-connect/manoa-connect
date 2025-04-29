'use client';

import '@/app/chatcard.css';

import { useEffect, useRef, useState } from 'react';
import { ListGroup, Row, Col  } from 'react-bootstrap';
import { Chat, Profile } from '@prisma/client';
import ChatItem from './ChatItem';
import AddChatForm from './AddChatForm';

const ChatCard = ({ profile, chats, matchs }: { profile: Profile, chats: Chat[], matchs: Profile[] }) => {
  const sessionUserEmail = profile.email;
  const currentProfileId = profile.id;
  const chatListRef = useRef<HTMLDivElement | null>(null);

  const [selectedMatch, setSelectedMatch] = useState<Profile | null>(
    matchs.length > 0 ? matchs[0] : null
  );

  const filteredChats = chats.filter(
    (chat) =>
      (chat.contactId === selectedMatch?.id && chat.owner === sessionUserEmail) || 
      (chat.contactId === currentProfileId && chat.owner === selectedMatch?.email) 
  );

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [filteredChats]);

  return (
    <main className="p-4">
      <Row>
        <Col style={{ width: '200px', flex: '0 0 auto' , borderRight: '1px solid #ccc'}}>
          <h5 className="text-body">Friends ({matchs.length})</h5>
          <ListGroup style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {matchs.map((match) => (
              <ListGroup.Item
                key={match.id}
                active={selectedMatch?.id === match.id}
                onClick={() => setSelectedMatch(match)}
                className={`friend-item ${selectedMatch?.id === match.id ? 'active-friend' : ''}`}
              >
                {match.firstName} {match.lastName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h5 className="text-body">
            {selectedMatch?.firstName} {selectedMatch?.lastName}
          </h5>
          <ListGroup variant="flush" style={{ maxHeight: '260px', overflowY: 'auto' }} ref={chatListRef}>
            {filteredChats.map((chat, index) => (
              <ChatItem key={chat.id} chat={chat} prevChat={index > 0 ? filteredChats[index - 1] : null} currentUserEmail={sessionUserEmail} />
            ))}
          </ListGroup>
          {selectedMatch && <AddChatForm profile={selectedMatch} />}
        </Col>
      </Row>
    </main>
  );
};

export default ChatCard;