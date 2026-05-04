export function timeAgo(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  const intervals = {
    ปี: 31536000,
    เดือน: 2592000,
    วัน: 86400,
    ชั่วโมง: 3600,
    นาที: 60,
    วินาที: 1
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)
    if (interval >= 1) {
      return `อัปเดต ${interval} ${unit}${interval > 1 ? '' : ''}ที่แล้ว`
    }
  }

  return 'เพิ่งอัปเดต'
}
