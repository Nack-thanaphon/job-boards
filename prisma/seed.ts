import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.job.createMany({
    data: [
      {
        title: 'Frontend Developer',
        description: 'พัฒนาหน้าเว็บด้วย React และ Next.js รับผิดชอบ UI/UX และทำงานร่วมกับทีม Designer เงินเดือน 35,000 - 55,000 บาท',
        location: 'กรุงเทพฯ'
      },
      {
        title: 'Backend Developer',
        description: 'พัฒนา API และระบบหลังบ้าน รักษาความปลอดภัย และปรับปรุงประสิทธิภาพระบบ เงินเดือน 40,000 - 65,000 บาท',
        location: 'กรุงเทพฯ'
      },
      {
        title: 'DevOps Engineer',
        description: 'ดูแลระบบ CI/CD จัดการ Cloud Infrastructure และ Monitor ระบบ เงินเดือน 45,000 - 70,000 บาท',
        location: 'ชลบุรี'
      }
    ]
  })

  await prisma.news.createMany({
    data: [
      {
        title: 'เปิดรับสมัครงานใหม่ 20 อัตรา',
        content: 'บริษัทเรากำลังขยายทีม รับสมัครหลายตำแหน่งทั้ง Frontend, Backend และ DevOps คุณสมบัติเข้างานง่าย เงินเดือนเป็นตก',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
      },
      {
        title: 'Work From Home หลังผ่าน Probation',
        content: 'พนักงานใหม่ทุกคนสามารถขอ Work From Home ได้หลังผ่าน Probation 3 เดือน สนใจติดต่อ HR ได้เลย',
        imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89b?w=800'
      }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
