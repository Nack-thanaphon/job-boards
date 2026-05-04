'use client'

import { redirect } from 'next/navigation'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { useFormStatus } from 'react-dom'

async function createJob(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const location = formData.get('location') as string

  const response = await fetch('/api/jobs/create', {
    method: 'POST',
    body: formData
  })

  if (response.ok) {
    redirect('/admin')
  }
}

export default function NewJobPage() {
  const { pending } = useFormStatus()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">เพิ่มงานใหม่</h1>
      <form action={createJob} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ตำแหน่งงาน *</label>
          <Input name="title" required placeholder="เช่น โปรแกรมเมอร์" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">รายละเอียดงาน *</label>
          <Textarea name="description" required rows={4} placeholder="อธิบายหน้าที่และความรับผิดชอบ" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">สถานที่ทำงาน *</label>
          <Input name="location" required placeholder="เช่น กรุงเทพฯ" />
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
