'use client'

import { useState } from 'react'

interface Interest {
  id: string
  fullName: string
  phone: string
  position: string | null
  status: string
  createdAt: Date
  job: {
    title: string
  }
}

export function InterestsPageContent({ interests }: { interests: Interest[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function markAsCalled(id: string) {
    setLoadingId(id)
    const response = await fetch(`/api/interests/${id}/mark-called`, {
      method: 'POST'
    })

    if (response.ok) {
      window.location.reload()
    } else {
      setLoadingId(null)
    }
  }

  return (
    <div className="space-y-4">
      {interests.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-lg">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">ยังไม่มีผู้สนใจงาน</h3>
          <p className="text-slate-600">เมื่อผู้ใช้กด &quot;สนใจงานนี้&quot; ข้อมูลจะแสดงที่นี่</p>
        </div>
      ) : (
        interests.map((interest) => (
          <div
            key={interest.id}
            className={`p-6 rounded-3xl border shadow-lg ${interest.status === 'contacted' ? 'bg-slate-100 border-slate-200' : 'bg-white border-blue-200'
              }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <h3 className="font-bold text-lg text-slate-900">
                  {interest.fullName}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">เบอร์โทร:</span>
                    <span className="text-sm font-semibold text-slate-900">{interest.phone}</span>
                  </div>
                  {interest.position && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-600">ตำแหน่ง:</span>
                      <span className="text-sm font-semibold text-slate-900">{interest.position}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">งาน:</span>
                    <span className="text-sm font-semibold text-blue-600">{interest.job.title}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  {new Date(interest.createdAt).toLocaleString('th-TH')}
                </div>
              </div>
              <div className="space-y-2 shrink-0">
                {interest.status === 'contacted' ? (
                  <span className="px-3 py-1.5 text-sm font-semibold text-green-700 bg-green-100 rounded-xl">
                    ติดต่อแล้ว
                  </span>
                ) : (
                  <button
                    onClick={() => markAsCalled(interest.id)}
                    disabled={loadingId === interest.id}
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {loadingId === interest.id ? 'กำลังบันทึก...' : 'ติดต่อแล้ว'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
