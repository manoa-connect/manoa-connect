'use client';

import { ListGroup } from 'react-bootstrap';
import { Chat } from '@prisma/client';
import { CheckAll, EyeSlash } from 'react-bootstrap-icons';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ChatItem = ({ chat, prevChat, currentUserEmail }:
{ chat: Chat; prevChat: Chat | null; currentUserEmail: string }) => {
  const isOwnMessage = chat.owner === currentUserEmail;

  const prevDate = prevChat ? new Date(prevChat.createdAt)
    : new Date(0); const currentDate = new Date(chat.createdAt) || 0;

  const isDifferentDate = prevDate.getFullYear() !== currentDate.getFullYear()
  || prevDate.getMonth() !== currentDate.getMonth() || prevDate.getDate() !== currentDate.getDate();

  const hideHeader = prevChat?.owner === chat.owner
  && Math.abs(new Date(prevChat.createdAt).getTime() - new Date(chat.createdAt).getTime()) < 5 * 60 * 1000;

  return (
    <ListGroup>
      <ListGroup.Item
        className={`${isOwnMessage ? 'text-end' : 'text-start'} border-0`}
        style={{ backgroundColor: 'transparent' }}
      >
        {isDifferentDate ? (
          <div className="text-center">
            <p className="chat-date">
              {new Date(chat.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </p>
          </div>
        ) : null}
        <div className="header-name">
          {(hideHeader || isOwnMessage) ? null : chat.owner}
        </div>
        {isOwnMessage ? (
          <div className="user-message">
            {chat.isRead ? <CheckAll /> : <EyeSlash />}
            <span className="ms-1">
              {new Date(chat.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          &nbsp;
            <p className="user-chat-bubble ms-2">
              {chat.chat}
            </p>
          </div>
        ) : (
          <div className="friend-message">
            <p className="friend-chat-bubble">
              {chat.chat}
            </p>
          &nbsp;
            {new Date(chat.createdAt).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ChatItem;
