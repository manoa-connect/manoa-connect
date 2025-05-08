'use server';

import { Year, Commute, Profile, Location, Days } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: {
  firstName: string;
  lastName: string;
  email: string;
  password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

export async function addChat(chat: { chat: string; contactId: number, owner: string }) {
  await prisma.chat.create({
    data: {
      chat: chat.chat,
      contactId: chat.contactId,
      owner: chat.owner,
    },
  });
}

/**
 * Adds a new Profile to the database.
 * @param profile, an object with the following properties.
 */
export async function createProfile(profile: {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  year: string;
  major: string;
  likes: string;
  mbti: string;
  commute: string;
  clubs: string;
  languages: string;
  previous: string;
}) {
  let year: Year = 'Freshman';
  if (profile.year === 'freshman') {
    year = 'Freshman';
  } else if (profile.year === 'sophomore') {
    year = 'Sophomore';
  } else if (profile.year === 'junior') {
    year = 'Junior';
  } else if (profile.year === 'senior') {
    year = 'Senior';
  } else {
    year = 'Graduate';
  }

  let commute: Commute = 'Dorm';
  if (profile.commute === 'dorm') {
    commute = 'Dorm';
  } else if (profile.commute === 'commuter') {
    commute = 'Commuter';
  } else {
    commute = 'Other';
  }

  await prisma.profile.create({
    data: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      description: profile.description,
      year,
      major: profile.major,
      likes: profile.likes,
      mbti: profile.mbti,
      commute,
      clubs: profile.clubs,
      languages: profile.languages,
      previous: profile.previous,
    },
  });

  // After adding, redirect to the user home page
  redirect('/profile');
}

/**
 * Edits an existing profile in the database.
 * @param profile, an object with the following properties: id, name, major, owner.
 */
export async function editProfile(profile: Profile) {
  // console.log(`editProfile data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.profile.update({
    where: { id: profile.id },
    data: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      description: profile.description,
      year: profile.year,
      major: profile.major,
      likes: profile.likes,
      mbti: profile.mbti,
      commute: profile.commute,
      clubs: profile.clubs,
      languages: profile.languages,
      previous: profile.previous,
    },
  });

  redirect('/profile');
}

export async function tryMatch(matchedId: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }

  const currentUser = await prisma.profile.findUnique({
    where: { email: session.user.email },
    include: { accepts: true, acceptedBy: true, matches: true },
  });

  if (!currentUser) {
    throw new Error('Current user profile not found');
  }

  const otherUser = await prisma.profile.findUnique({
    where: { id: matchedId },
    include: { accepts: true },
  });

  if (!otherUser) {
    throw new Error('Other user profile not found');
  }

  const theyLikedMe = otherUser.accepts.some(p => p.id === currentUser.id);

  if (theyLikedMe) {
    // Mutual match → move both to matches, remove from accepts
    await prisma.profile.update({
      where: { id: currentUser.id },
      data: {
        accepts: { disconnect: { id: matchedId } },
        matches: { connect: { id: matchedId } },
      },
    });

    await prisma.profile.update({
      where: { id: matchedId },
      data: {
        accepts: { disconnect: { id: currentUser.id } },
        matches: { connect: { id: currentUser.id } },
      },
    });

    return { matched: true };
  }
  // One-sided like
  await prisma.profile.update({
    where: { id: currentUser.id },
    data: {
      accepts: { connect: { id: matchedId } },
    },
  });

  return { matched: false };
}

/**
 * Adds a new class to the database.
 * @param class, an object with the following properties: name, startTime, endTime, location.
 */
export async function addClass(classData: {
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  days: string[];
  email: string }) {
  // console.log(`addClass data: ${JSON.stringify(class, null, 2)}`);
  const location = classData.location as Location;
  const days = classData.days.map(day => day as Days);
  await prisma.class.create({
    data: {
      name: classData.name,
      startTime: classData.startTime,
      endTime: classData.endTime,
      location,
      days,
      email: classData.email,
    },
  });
  // After adding, redirect/reload the page
  redirect('/editSchedule');
}

/**
 * Deletes an existing class from the database.
 * @param id, the id of the class to delete.
 */
export async function deleteClass(id: number) {
  // console.log(`deleteClass id: ${id}`);
  await prisma.class.delete({
    where: { id },
  });
  // After adding, redirect/reload the page
  redirect('/editSchedule');
}
