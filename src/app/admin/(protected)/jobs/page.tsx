import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/ui/button'
import Link from 'next/link'

async function JobsPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    redirect('/admin/login')
  }

  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">งานทั้งหมด</h1>
        <Link href="/admin/jobs/new">
          <Button>เพิ่มงานใหม่</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {job.description}
                </p>
                <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-xl inline-block">
                  {job.location}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="text-xs text-slate-500">
                  {new Date(job.createdAt).toLocaleDateString('th-TH')}
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/jobs/${job.id}`}>
                    <Button size="sm" className="text-xs">
                      แก้ไข
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobsPage
export const dynamic = 'force-dynamic'
