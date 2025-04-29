import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { chatIds } = await req.json();

  if (!Array.isArray(chatIds)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  await prisma.chat.updateMany({
    where: {
      id: { in: chatIds },
    },
    data: {
      isRead: true,
    },
  });

  return NextResponse.json({ success: true });
}