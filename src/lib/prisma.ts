import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
};

const getDatabaseUrl = () => {
  if (typeof process !== 'undefined' && process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  return 'file:./dev.db';
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
          url: getDatabaseUrl(),
      },
    },
  });
