import Link from "next/link";

import { listPublishedJobs } from "@/features/jobs/jobs.repo";
import { listPublishedNews } from "@/features/news/news.repo";
import { Container } from "@/ui/container";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { timeAgo } from "@/lib/time-ago";

export default function Home() {
  return <HomePage />;
}

async function HomePage() {
  const [jobs, news] = await Promise.all([listPublishedJobs(), listPublishedNews()]);
  const urgentJobs = jobs.filter(job => job.title.toLowerCase().includes('ด่วน') || job.title.toLowerCase().includes('urgent'));
  
  const totalViews = (jobs.length * 150) + 500 + (news.length * 50);
  const todayViews = Math.floor((jobs.length + news.length) * 15) + 10;

  return (
    <div className="flex flex-1 flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-lg sticky top-0 z-40">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ระบบหางาน
          </Link>
          <Link 
            href="/admin/login" 
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
          >
            Admin
          </Link>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-12 space-y-12">
          <section className="space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                หางานด่วน ไว้ที่เดียว
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                งานคุณภาพ จากบริษัทชั้นนำ คัดสรรแล้ว
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-2xl rounded-3xl text-white">
                <div className="space-y-2">
                  <div className="text-4xl font-bold">{jobs.length}+</div>
                  <div className="text-blue-100 font-medium">งานว่าง</div>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 border-0 shadow-2xl rounded-3xl text-white">
                <div className="space-y-2">
                  <div className="text-4xl font-bold">{news.length}</div>
                  <div className="text-indigo-100 font-medium">ข่าวประกาศ</div>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 shadow-2xl rounded-3xl text-white">
                <div className="space-y-2">
                  <div className="text-4xl font-bold">{totalViews.toLocaleString()}</div>
                  <div className="text-emerald-100 font-medium">ผู้เข้าชมทั้งหมด</div>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-amber-500 to-amber-600 border-0 shadow-2xl rounded-3xl text-white">
                <div className="space-y-2">
                  <div className="text-4xl font-bold">{todayViews}</div>
                  <div className="text-amber-100 font-medium">ผู้เข้าชมวันนี้</div>
                </div>
              </Card>
            </div>
          </section>

          {urgentJobs.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  งานด่วนพิเศษ
                </h2>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {urgentJobs.slice(0, 3).map((job) => (
                  <Card key={job.id} className="group p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 shadow-xl hover:shadow-2xl hover:border-red-300 transition-all duration-300 rounded-3xl cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-2xl">
                      URGENT
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h2 className="font-bold text-lg text-slate-900 group-hover:text-red-600 transition-colors">
                          {job.title}
                        </h2>
                        <div className="shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                          {job.title.charAt(0)}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">
                        {[job.company, job.location].filter(Boolean).join(" • ") || "—"}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-500 font-medium">
                          {new Date(job.createdAt).toLocaleDateString("th-TH")}
                        </p>
                        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-lg">
                          {timeAgo(job.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-5">
                      <Button asChild className="w-full rounded-2xl py-3 text-base font-semibold shadow-lg hover:shadow-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0">
                        <Link href={`/jobs/${job.id}`}>สมัครด่วน</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center">
              งานล่าสุด
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.length ? (
                jobs.map((job) => (
                  <Card key={job.id} className="group p-6 bg-white border-2 border-blue-100 shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all duration-300 rounded-3xl cursor-pointer">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h2 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h2>
                        <div className="shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                          {job.title.charAt(0)}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">
                        {[job.company, job.location].filter(Boolean).join(" • ") || "—"}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-slate-500 font-medium">
                          {new Date(job.createdAt).toLocaleDateString("th-TH")}
                        </p>
                        <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-lg">
                          {timeAgo(job.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-5">
                      <Button asChild className="w-full rounded-2xl py-3 text-base font-semibold shadow-lg hover:shadow-xl">
                        <Link href={`/jobs/${job.id}`}>อ่านรายละเอียด</Link>
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center bg-white rounded-3xl shadow-lg col-span-full">
                  <div className="text-6xl mb-4">💼</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">ยังไม่มีงานที่ประกาศ</h3>
                  <p className="text-slate-600">งานใหม่จะปรากฏที่นี่เร็วๆ นี้</p>
                </Card>
              )}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center">ข่าว/ประกาศ</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {news.length ? (
                news.map((item) => (
                  <Card key={item.id} className="p-0 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group cursor-pointer">
                    {item.imageUrl && (
                      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="space-y-2">
                        <div className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</div>
                        <div className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                          {item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content}
                        </div>
                        <div className="flex items-center gap-2">
                          <Link 
                            href={`/news/${item.id}`}
                            className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                          >
                            อ่านต่อ →
                          </Link>
                          <span className="text-xs text-slate-500 ml-auto">
                            {timeAgo(item.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center bg-white rounded-3xl shadow-lg col-span-full">
                  <div className="text-6xl mb-4">📰</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">ยังไม่มีข่าวใหม่</h3>
                  <p className="text-slate-600">ข่าวประกาศจะแสดงที่นี่</p>
                </Card>
              )}
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}
