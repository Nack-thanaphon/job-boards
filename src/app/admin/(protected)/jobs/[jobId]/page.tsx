import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { JobsEditContent } from './jobs-edit-content'

async function JobsEditPage({
  params
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    redirect('/admin/login')
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId }
  })

  if (!job) {
    redirect('/admin/jobs')
  }

  return <JobsEditContent job={job} />
}

export default JobsEditPage
export const dynamic = 'force-dynamic'
