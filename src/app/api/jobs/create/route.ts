import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const location = formData.get('location') as string

  await prisma.job.create({
    data: {
      title,
      description,
      location
    }
  })

  revalidatePath('/')
  revalidatePath('/admin/jobs')

  return NextResponse.json({ success: true })
}
