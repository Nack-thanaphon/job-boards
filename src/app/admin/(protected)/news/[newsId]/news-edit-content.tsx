'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/ui/button'

interface News {
  id: string
  title: string
  content: string
  imageUrl: string | null
}

interface NewsEditContentProps {
  news: News
}

export function NewsEditContent({ news }: NewsEditContentProps) {
  const router = useRouter()
  const [title, setTitle] = useState(news.title)
  const [content, setContent] = useState(news.content)
  const [imageUrl, setImageUrl] = useState(news.imageUrl || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/news/${news.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageUrl: imageUrl || null })
      })

      if (response.ok) {
        router.push('/admin/news')
      } else {
        alert('เกิดข้อผิดพลาด')
      }
    } catch {
      alert('เกิดข้อผิดพลาด')
    }

    setIsSubmitting(false)
  }

  async function handleDelete() {
    if (!confirm('ยืนยันการลบข่าวนี้?')) return

    try {
      const response = await fetch(`/api/news/${news.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.push('/admin/news')
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาด')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">แก้ไขข่าว</h1>
        <Button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700"
        >
          ลบข่าว
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <label className="text-sm font-medium">หัวข้อ</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">รูปภาพ URL (ถ้ามี)</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">เนื้อหา</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
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
