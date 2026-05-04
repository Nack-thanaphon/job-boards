'use client'

import { useState } from "react";

import { createInterest } from "@/features/interests/interests.repo";
import { normalizePhone } from "@/lib/validators";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Modal } from "@/ui/modal";

interface Job {
  id: string
  title: string
  description: string
  location: string
}

interface JobDetailContentProps {
  job: Job;
}

export function JobDetailContent({ job }: JobDetailContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const phoneNormalized = normalizePhone(phone);
      if (phoneNormalized.length < 9) {
        alert('กรุณากรอกเบอร์โทรให้ถูกต้อง');
        setIsSubmitting(false);
        return;
      }

      await createInterest({
        jobId: job.id,
        fullName,
        phone: phoneNormalized,
        position
      });

      setShowSuccess(true);
      setIsModalOpen(false);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className="w-full max-w-md py-4 text-lg font-bold rounded-3xl shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
      >
        สนใจงานนี้
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">สนใจงานนี้</h2>
            <p className="text-sm text-slate-600">
              ฝากข้อมูลไว้เพื่อให้ทีม Call Center ติดต่อกลับ
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">ชื่อ-นามสกุล</label>
              <Input 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="เช่น สมชาย ใจดี" 
                required 
                className="rounded-2xl py-3 px-4"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">เบอร์โทร</label>
              <Input 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="เช่น 0812345678" 
                required 
                className="rounded-2xl py-3 px-4"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">ตำแหน่งที่สนใจ (ถ้ามี)</label>
              <Input 
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="เช่น ฝ่ายขาย / ช่างเทคนิค" 
                className="rounded-2xl py-3 px-4"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-2xl font-semibold"
              >
                {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อมูล'}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-2xl font-semibold"
              >
                ยกเลิก
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {showSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl font-semibold animate-in fade-in slide-in-from-bottom-4">
          รับข้อมูลเรียบร้อย ทีมงานจะติดต่อกลับเร็ว ๆ นี้
        </div>
      )}
    </>
  );
}
