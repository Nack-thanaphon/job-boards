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
  const content = formData.get('content') as string
  const imageUrl = formData.get('imageUrl') as string

  await prisma.news.create({
    data: {
      title,
      content,
      imageUrl: imageUrl || null
    }
  })

  revalidatePath('/')
  revalidatePath('/admin/news')

  return NextResponse.json({ success: true })
}
