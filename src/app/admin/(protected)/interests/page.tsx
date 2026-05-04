import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { InterestsPageContent } from '../interests-page-content'

async function InterestsPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    redirect('/admin/login')
  }

  const interests = await prisma.interest.findMany({
    orderBy: { createdAt: 'desc' },
    include: { job: true }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ผู้สนใจงาน</h1>
      <InterestsPageContent interests={interests} />
    </div>
  )
}

export default InterestsPage
export const dynamic = 'force-dynamic'
