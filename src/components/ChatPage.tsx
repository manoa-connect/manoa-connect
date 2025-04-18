'use client';

import { ListGroup } from 'react-bootstrap';
import { Chat, Profile } from '@prisma/client';
import ChatItem from './ChatItem';
import AddChatForm from './AddChatForm';

const ChatCard = ({ profile, chats }: { profile: Profile; chats: Chat[] }) => (
  <main className="p-4">
    <h2 className="text-center">Your Chats</h2>
    <ListGroup variant="flush">
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </ListGroup>
    <AddChatForm profile={profile} />
  </main>
);

export default ChatCard;