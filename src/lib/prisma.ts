import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.NODE_ENV === 'production' 
          ? 'file:libsql://job-boards-nack-thanaphon.aws-ap-northeast-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Nzc4NjY2NDgsImlkIjoiMDE5ZGYxMWItZGIwMS03M2Y1LWI3ZTMtNTA0ZjQyMTNkZDY3IiwicmlkIjoiNzM5NmUwNTgtNzAyMS00ODc2LWIwOGYtMDA4YWIyMzQxMjAzIn0.UW5jjIz5whNCurh-cdNcTSdLQ4soK73MHw8t5gJTjcNGZGpPzl9xQD1Qhfyodh0euuKgc8a16SEEO6rxsI3fBg'
          : 'file:./prisma/dev.db',
      },
    },
  });
