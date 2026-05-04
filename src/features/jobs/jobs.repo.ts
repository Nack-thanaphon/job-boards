import { prisma } from "@/lib/prisma";

export async function listPublishedJobs() {
  return prisma.job.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      company: true,
      location: true,
      createdAt: true,
    },
  });
}

export async function listAllJobs() {
  return prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      company: true,
      location: true,
      published: true,
      createdAt: true,
    },
  });
}

export async function getJobById(jobId: string) {
  return prisma.job.findUnique({
    where: { id: jobId },
  });
}

export async function createJob(input: {
  title: string;
  company?: string;
  location?: string;
  description: string;
  published: boolean;
}) {
  return prisma.job.create({ data: input });
}

export async function updateJob(
  jobId: string,
  input: {
    title: string;
    company?: string;
    location?: string;
    description: string;
    published: boolean;
  },
) {
  return prisma.job.update({ where: { id: jobId }, data: input });
}

export async function deleteJob(jobId: string) {
  return prisma.job.delete({ where: { id: jobId } });
}
