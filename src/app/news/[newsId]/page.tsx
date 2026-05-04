import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNewsById } from "@/features/news/news.repo";
import { Container } from "@/ui/container";
import { Card } from "@/ui/card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ newsId: string }>;
}): Promise<Metadata> {
  const { newsId } = await params;
  const news = await getNewsById(newsId);
  if (!news || !news.published) return { title: "ไม่พบข่าว" };
  return {
    title: news.title,
    description: news.content.slice(0, 140),
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = await params;
  const news = await getNewsById(newsId);
  if (!news || !news.published) notFound();

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-lg sticky top-0 z-40">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ระบบหางาน
          </Link>
          <Link 
            href="/" 
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
          >
            กลับหน้าแรก
          </Link>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-12 space-y-8">
          <Card className="p-8 bg-white border-0 shadow-2xl rounded-3xl space-y-6">
            {news.imageUrl && (
              <div className="w-full h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                <img 
                  src={news.imageUrl} 
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">{news.title}</h1>
              <p className="text-sm text-slate-500 font-medium">
                {new Date(news.createdAt).toLocaleDateString('th-TH', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="prose prose-lg max-w-none">
              <div className="text-lg text-slate-700 whitespace-pre-line leading-relaxed">
                {news.content}
              </div>
            </div>
          </Card>
        </Container>
      </main>
    </div>
  );
}
