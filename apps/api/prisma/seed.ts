import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const demoPassword = await hash('Passw0rd!', 10);

  await prisma.user.upsert({
    where: { email: 'demo@slat.app' },
    update: {
      name: 'Demo User',
      passwordHash: demoPassword,
      emailVerified: true,
    },
    create: {
      email: 'demo@slat.app',
      name: 'Demo User',
      passwordHash: demoPassword,
      emailVerified: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Failed to seed database', error);
    await prisma.$disconnect();
    process.exit(1);
  });
