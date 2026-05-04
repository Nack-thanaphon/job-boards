'use client'

import { redirect } from 'next/navigation'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { useFormStatus } from 'react-dom'

async function createNews(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const imageUrl = formData.get('imageUrl') as string

  const response = await fetch('/api/news/create', {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    redirect('/admin')
  }
}

export default function NewNewsPage() {
  const { pending } = useFormStatus()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">เพิ่มข่าวใหม่</h1>
      <form action={createNews} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">หัวข้อข่าว *</label>
          <Input name="title" required placeholder="หัวข้อข่าว" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">เนื้อหา *</label>
          <Textarea name="content" required rows={6} placeholder="รายละเอียดข่าว" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL รูปภาพ (ถ้ามี)</label>
          <Input name="imageUrl" placeholder="เช่น https://images.unsplash.com/photo-..." />
          <p className="text-xs text-slate-500 mt-1">ใช้ภาพฟรีจาก Unsplash, Pexels หรืออื่นๆ</p>
        </div>
        <div className="flex gap-4">
          <button 
            type="submit"
            disabled={pending}
            className="px-6 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl border-0 shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {pending ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
          <button 
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2.5 text-base font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  )
}
