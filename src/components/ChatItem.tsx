'use client';

import { ListGroup } from 'react-bootstrap';
import { Chat } from '@prisma/client';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ChatItem = ({ chat }: { chat: Chat }) => (
  <ListGroup.Item>
    <p className="fw-lighter">
      {chat.owner}
      &nbsp;&nbsp;
      {chat.createdAt.toLocaleDateString('en-US')}</p>
    <p>{chat.chat}</p>
  </ListGroup.Item>
);

export default ChatItem;
