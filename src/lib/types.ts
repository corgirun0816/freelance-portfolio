export interface Course {
  id: string
  name: string
  instructor: string
  room: string
  color: string
  dayIndex: number
  periodIndex: number
  notes: string
}

export const DAYS = ["月", "火", "水", "木", "金", "土"] as const
export type Day = (typeof DAYS)[number]

export const PERIODS = [
  { label: "1限", time: "9:00〜10:30" },
  { label: "2限", time: "10:40〜12:10" },
  { label: "3限", time: "13:00〜14:30" },
  { label: "4限", time: "14:40〜16:10" },
  { label: "5限", time: "16:20〜17:50" },
  { label: "6限", time: "18:00〜19:30" },
] as const

export const COURSE_COLORS = [
  { name: "ブルー", value: "bg-blue-100 border-blue-300 text-blue-900", hex: "#dbeafe" },
  { name: "グリーン", value: "bg-emerald-100 border-emerald-300 text-emerald-900", hex: "#d1fae5" },
  { name: "パープル", value: "bg-purple-100 border-purple-300 text-purple-900", hex: "#f3e8ff" },
  { name: "オレンジ", value: "bg-orange-100 border-orange-300 text-orange-900", hex: "#ffedd5" },
  { name: "ピンク", value: "bg-pink-100 border-pink-300 text-pink-900", hex: "#fce7f3" },
  { name: "イエロー", value: "bg-yellow-100 border-yellow-300 text-yellow-900", hex: "#fef9c3" },
  { name: "レッド", value: "bg-red-100 border-red-300 text-red-900", hex: "#fee2e2" },
  { name: "ティール", value: "bg-teal-100 border-teal-300 text-teal-900", hex: "#ccfbf1" },
] as const
