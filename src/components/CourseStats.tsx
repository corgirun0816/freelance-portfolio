"use client"

import { Course, DAYS } from "@/lib/types"
import { BookOpen, Clock, CalendarDays } from "lucide-react"

interface CourseStatsProps {
  courses: Course[]
}

export function CourseStats({ courses }: CourseStatsProps) {
  const totalCourses = courses.length
  const totalHours = totalCourses * 1.5
  const activeDays = new Set(courses.map((c) => c.dayIndex)).size

  const stats = [
    {
      icon: BookOpen,
      label: "登録科目数",
      value: `${totalCourses}科目`,
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Clock,
      label: "合計授業時間",
      value: `${totalHours}時間/週`,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: CalendarDays,
      label: "授業日数",
      value: `${activeDays}日/週`,
      color: "text-purple-600 bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4"
        >
          <div className={`p-2.5 rounded-xl ${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-sm font-bold text-gray-800">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
