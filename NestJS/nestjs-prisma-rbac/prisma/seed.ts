import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const users = [
    {
      name: 'System Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: Role.ADMIN,
      isActive: true,
      lastLoginAt: new Date(),
    },
    {
      name: 'John User',
      email: 'john@example.com',
      password: 'user1234',
      role: Role.USER,
      isActive: true,
      lastLoginAt: new Date(),
    },
    {
      name: 'Jane User',
      email: 'jane@example.com',
      password: 'user1234',
      role: Role.USER,
      isActive: true,
      lastLoginAt: thirtyDaysAgo,
    },
    {
      name: 'Chris Viewer',
      email: 'chris@example.com',
      password: 'user1234',
      role: Role.USER,
      isActive: false,
      lastLoginAt: null,
    },
    {
      name: 'Sara Manager',
      email: 'sara@example.com',
      password: 'user1234',
      role: Role.ADMIN,
      isActive: true,
      lastLoginAt: new Date(),
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: hashedPassword,
        role: user.role,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
      },
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
        isActive: user.isActive,
        lastLoginAt: user.lastLoginAt,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
