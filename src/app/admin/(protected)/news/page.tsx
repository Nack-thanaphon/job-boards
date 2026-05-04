import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/ui/button'
import Link from 'next/link'

async function NewsPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    redirect('/admin/login')
  }

  const news = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ข่าวทั้งหมด</h1>
        <Link href="/admin/news/new">
          <Button>เพิ่มข่าวใหม่</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                {item.imageUrl && (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                )}
                <p className="text-sm text-slate-600 line-clamp-3 whitespace-pre-line">
                  {item.content}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleDateString('th-TH')}
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/news/${item.id}`}>
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

export default NewsPage
export const dynamic = 'force-dynamic'
