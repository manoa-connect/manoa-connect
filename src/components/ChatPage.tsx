'use client';

import '@/app/chatcard.css';

import { useEffect, useRef, useState } from 'react';
import { ListGroup, Row, Col, Container } from 'react-bootstrap';
import { Chat, Profile } from '@prisma/client';
import ChatItem from './ChatItem';
import AddChatForm from './AddChatForm';

const ChatCard = ({ profile, chats, matchs }: { profile: Profile, chats: Chat[], matchs: Profile[] }) => {
  const sessionUserEmail = profile.email;
  const currentProfileId = profile.id;
  const chatListRef = useRef<HTMLDivElement | null>(null);

  const [selectedMatch, setSelectedMatch] = useState<Profile | null>(
    matchs.length > 0 ? matchs[0] : null,
  );

  const [chatList, setChatList] = useState<Chat[]>(chats);

  const filteredChats = chatList.filter(
    (chat) => (chat.contactId === selectedMatch?.id && chat.owner === sessionUserEmail)
    || (chat.contactId === currentProfileId && chat.owner === selectedMatch?.email),
  );

  const fetchChats = async () => {
    const res = await fetch('/api/chats');
    const data = await res.json();
    setChatList(data);
  };

  useEffect(() => {
    if (filteredChats.length === 0) return;

    async function markChatsAsRead() {
      const unreadChatIds = filteredChats
        .filter(chat => !chat.isRead && chat.owner !== sessionUserEmail) // 自分が受け取った未読チャットだけ
        .map(chat => chat.id);

      if (unreadChatIds.length > 0) {
        await fetch('/api/markAsRead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatIds: unreadChatIds }),
        });

        // eslint-disable-next-line no-confusing-arrow
        setChatList(prev => prev.map(chat => unreadChatIds.includes(chat.id) ? { ...chat, isRead: true } : chat));
      }
    }

    markChatsAsRead();

    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [filteredChats, sessionUserEmail]);

  return (
    <Container fluid>
      <Row>
        <Col
          style={{ width: '200px', height: '75vh', flex: '0 0 auto', borderRight: '1px solid #ccc' }}
          className="py-3"
        >
          <h5 className="text-body">
            <span className="text-heavitas">Friends</span> (
            {matchs.length}
            )
          </h5>
          <ListGroup style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {matchs.map((match) => {
              const unreadCount = chatList.filter(chat => chat.owner === match.email
                && chat.contactId === currentProfileId
                && !chat.isRead).length;
              return (
                <ListGroup.Item
                  key={match.id}
                  active={selectedMatch?.id === match.id}
                  onClick={() => setSelectedMatch(match)}
                  className={`friend-item ${selectedMatch?.id === match.id ? 'active-friend' : ''} border-success`}
                >
                  {`${match.firstName} ${match.lastName}`}
                  {unreadCount > 0 && (
                    <span
                      className="badge"
                      style={{ float: 'right', backgroundColor: '#4CAF50', color: '#ffffff' }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col id="chat-bg-image" style={{ height: '87vh' }}>
          <Col className="px-3">
            <h5 className="mt-5 text-heavitas text-light">
              {`${selectedMatch?.firstName} ${selectedMatch?.lastName}`}
            </h5>
            <ListGroup variant="flush" style={{ maxHeight: '500px', overflowY: 'auto' }} ref={chatListRef}>
              {filteredChats.map((chat, index) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  prevChat={index > 0 ? filteredChats[index - 1] : null}
                  currentUserEmail={sessionUserEmail}
                />
              ))}
            </ListGroup>
            {selectedMatch && <AddChatForm profile={selectedMatch} onNewChat={fetchChats} />}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatCard;
