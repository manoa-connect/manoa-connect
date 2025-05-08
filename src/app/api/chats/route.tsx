/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // eslint-disable-next-line prefer-destructuring
  const email = session.user.email;

  const profile = await prisma.profile.findUnique({
    where: { email },
  });

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  const chats = await prisma.chat.findMany({
    where: {
      OR: [
        { contactId: profile.id },
        { owner: email },
      ],
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return NextResponse.json(chats);
}
