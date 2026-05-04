import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJobById } from "@/features/jobs/jobs.repo";
import { Container } from "@/ui/container";
import { Card } from "@/ui/card";
import { JobDetailContent } from "./job-detail-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ jobId: string }>;
}): Promise<Metadata> {
  const { jobId } = await params;
  const job = await getJobById(jobId);
  if (!job || !job.published) return { title: "ไม่พบงาน" };
  return {
    title: job.title,
    description: job.description.slice(0, 140),
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const job = await getJobById(jobId);
  if (!job || !job.published) notFound();

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
          <Card className="p-8 bg-white border-0 shadow-2xl rounded-3xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl">
                    {job.title.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
                    <p className="text-sm text-slate-600 font-medium">
                      {[job.company, job.location].filter(Boolean).join(" • ") || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 text-base text-slate-700 whitespace-pre-line leading-relaxed">
              {job.description}
            </div>
          </Card>

          <div className="flex justify-center">
            <JobDetailContent job={job} />
          </div>
        </Container>
      </main>
    </div>
  );
}
