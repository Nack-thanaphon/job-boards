import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const interests = await prisma.interest.findMany({
    orderBy: { createdAt: 'desc' },
    include: { job: true }
  })

  return NextResponse.json(interests)
}
