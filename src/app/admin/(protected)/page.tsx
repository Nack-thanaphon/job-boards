import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Button } from '@/ui/button'

async function DashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    redirect('/admin/login')
  }

  const [jobsCount, interestsCount, recentInterests] = await Promise.all([
    prisma.job.count(),
    prisma.interest.count(),
    prisma.interest.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { job: true }
    })
  ])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/admin/jobs/new">
          <Button>เพิ่มงานใหม่</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-semibold">งานทั้งหมด</h3>
          <p className="text-3xl font-bold mt-2">{jobsCount}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-semibold">ผู้สนใจทั้งหมด</h3>
          <p className="text-3xl font-bold mt-2">{interestsCount}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-semibold">Call Center Queue</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">{recentInterests.filter(i => i.status === 'new').length}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">ผู้สนใจล่าสุด</h2>
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ชื่อ</th>
                <th className="px-4 py-3 text-left text-sm font-medium">เบอร์โทร</th>
                <th className="px-4 py-3 text-left text-sm font-medium">ตำแหน่ง</th>
                <th className="px-4 py-3 text-left text-sm font-medium">สถานะ</th>
                <th className="px-4 py-3 text-left text-sm font-medium">วันที่</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentInterests.map((interest) => (
                <tr key={interest.id}>
                  <td className="px-4 py-3">{interest.fullName}</td>
                  <td className="px-4 py-3">{interest.phone}</td>
                  <td className="px-4 py-3">{interest.job.title}</td>
                  <td className="px-4 py-3">
                    {interest.status === 'contacted' ? (
                      <span className="text-green-600">ติดต่อแล้ว</span>
                    ) : (
                      <span className="text-orange-600">รอติดต่อ</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(interest.createdAt).toLocaleDateString('th-TH')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
export const dynamic = 'force-dynamic'
