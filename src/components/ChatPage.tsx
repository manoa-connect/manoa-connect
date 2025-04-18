import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import ChatItem from '@/components/ChatItem';
import AddChatForm from '@/components/AddChatForm';
import { prisma } from '@/lib/prisma';
import { Chat, Profile } from '@prisma/client';
import { ListGroup } from 'react-bootstrap';

/** The Home page. */
const ChatPage = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    <main className="p-4">
      Please log in to view your chats.
    </main>;
  }

  const profile: Profile | null = await prisma.profile.findUnique({
    where: { email: email! }, 
  });

  if (!profile) {
    return (
      <main className="p-4">
        No profile found.
      </main>
    );
  }

  const chats: Chat[] = await prisma.chat.findMany({
    where: { owner: email! },
    orderBy: { createdAt: 'asc' },
  });

  <main>
    <ListGroup variant="flush">
      {chats.map((chat: Chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </ListGroup>
    <AddChatForm profile={profile} />
  </main>
};

export default ChatPage;