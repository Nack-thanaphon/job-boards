import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { NewsEditContent } from './news-edit-content'

async function NewsEditPage({
  params
}: {
  params: Promise<{ newsId: string }>
}) {
  const { newsId } = await params
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    redirect('/admin/login')
  }

  const news = await prisma.news.findUnique({
    where: { id: newsId }
  })

  if (!news) {
    redirect('/admin/news')
  }

  return <NewsEditContent news={news} />
}

export default NewsEditPage
export const dynamic = 'force-dynamic'
