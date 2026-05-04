'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/ui/button'

interface Job {
  id: string
  title: string
  description: string
  location: string | null
}

interface JobsEditContentProps {
  job: Job
}

export function JobsEditContent({ job }: JobsEditContentProps) {
  const router = useRouter()
  const [title, setTitle] = useState(job.title)
  const [description, setDescription] = useState(job.description)
  const [location, setLocation] = useState<string>(job.location || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, location })
      })

      if (response.ok) {
        router.push('/admin/jobs')
      } else {
        alert('เกิดข้อผิดพลาด')
      }
    } catch {
      alert('เกิดข้อผิดพลาด')
    }

    setIsSubmitting(false)
  }

  async function handleDelete() {
    if (!confirm('ยืนยันการลบงานนี้?')) return

    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.push('/admin/jobs')
      } else {
        alert('เกิดข้อผิดพลาด')
      }
    } catch {
      alert('เกิดข้อผิดพลาด')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">แก้ไขงาน</h1>
        <Button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700"
        >
          ลบงาน
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <label className="text-sm font-medium">ชื่อตำแหน่ง</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">รายละเอียด</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={10}
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">สถานที่</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
        </Button>
      </form>
    </div>
  )
}
