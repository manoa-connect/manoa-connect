'use client';

import { ListGroup } from 'react-bootstrap';
import { Chat } from '@prisma/client';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ChatItem = ({ chat, currentUserEmail }: { chat: Chat; currentUserEmail: string }) => {
  const isOwnMessage = chat.owner === currentUserEmail;

  return(
    <ListGroup.Item
      className={`${isOwnMessage ? 'text-end' : 'text-start'} border-0`}
    >
      <p className="fw-lighter">
        {isOwnMessage ? '' : chat.owner}
        &nbsp;
        {new Date(chat.createdAt).toLocaleTimeString('en-US', {
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
          })}
      </p>
      <p className="mb-0">{chat.chat}</p>
    </ListGroup.Item>
  );
};

export default ChatItem;
