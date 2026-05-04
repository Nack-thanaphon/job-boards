import { prisma } from "@/lib/prisma";

export async function listPublishedNews() {
  return prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, content: true, createdAt: true, imageUrl: true },
    take: 5,
  });
}

export async function listAllNews() {
  return prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, published: true, createdAt: true },
  });
}

export async function getNewsById(newsId: string) {
  return prisma.news.findUnique({ where: { id: newsId } });
}

export async function createNews(input: {
  title: string;
  content: string;
  published: boolean;
}) {
  return prisma.news.create({ data: input });
}

export async function updateNews(
  newsId: string,
  input: { title: string; content: string; published: boolean },
) {
  return prisma.news.update({ where: { id: newsId }, data: input });
}

export async function deleteNews(newsId: string) {
  return prisma.news.delete({ where: { id: newsId } });
}
