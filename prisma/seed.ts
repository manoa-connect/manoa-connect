import { PrismaClient, Role, Year, Commute } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    const role = account.role as Role || Role.USER;
    console.log(`  Creating user: '${account.firstName} ${account.lastName}' ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        firstName: account.firstName || 'Default',
        lastName: account.lastName || 'User',
        email: account.email,
        password,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
  for (const data of config.defaultProfiles) {
    console.log(`  Adding profile: \n${JSON.stringify(data)}`);
    // eslint-disable-next-line no-await-in-loop
    await prisma.profile.upsert({
      where: { email: data.email },
      update: {},
      create: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        description: data.description,
        year: data.year as Year,
        major: data.major,
        likes: data.likes,
        mbti: data.mbti,
        commute: data.commute as Commute,
        current: data.current,
        previous: data.previous,
      },
    });
  }
  for (const data of config.defaultProfiles) {
    if (data.liked?.length) {
      await prisma.profile.update({
        where: { email: data.email },
        data: {
          accepts: {
            connect: data.liked.map((email: string) => ({ email }))
          }
        }
      });
    }
    if (data.matched?.length) {
      await prisma.profile.update({
        where: { email: data.email },
        data: {
          matches: {
            connect: data.matched.map((email: string) => ({ email }))
          }
        }
      });
    }
  }
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
