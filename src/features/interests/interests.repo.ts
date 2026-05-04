import { prisma } from "@/lib/prisma";

export async function createInterest(input: {
  jobId: string;
  fullName: string;
  phone: string;
  position?: string;
}) {
  return prisma.interest.create({ data: input });
}

export async function listInterests() {
  return prisma.interest.findMany({
    orderBy: { createdAt: "desc" },
    include: { job: { select: { id: true, title: true } } },
  });
}

export async function updateInterestStatus(interestId: string, status: string) {
  return prisma.interest.update({ where: { id: interestId }, data: { status } });
}
