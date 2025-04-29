import ChatPage from '@/components/ChatPage';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

const Home = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return <main className="p-4">Please log in to view your chats.</main>;
  }

  const profile = await prisma.profile.findUnique({
    where: { email },
    include: { matches: true },
  });

  if (!profile) {
    return <main className="p-4">No profile found.</main>;
  }

  if (profile.matches.length === 0) {
    return <main className="p-4">No matches yet.</main>;
  }

  const chats = await prisma.chat.findMany({
    where: {
        OR: [
        { owner: email },                      
        { contactId: profile.id },              
      ],
    },
    orderBy: { createdAt: 'asc' },
  });

  return <ChatPage profile={profile} chats={chats} matchs={profile.matches} />;
};

export default Home;