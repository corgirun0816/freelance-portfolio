"use client"

import { Course, DAYS, PERIODS, COURSE_COLORS } from "@/lib/types"
import { Plus } from "lucide-react"

interface TimetableGridProps {
  courses: Course[]
  onCellClick: (dayIndex: number, periodIndex: number) => void
  onCourseClick: (course: Course) => void
}

export function TimetableGrid({ courses, onCellClick, onCourseClick }: TimetableGridProps) {
  function getCourse(dayIndex: number, periodIndex: number): Course | undefined {
    return courses.find((c) => c.dayIndex === dayIndex && c.periodIndex === periodIndex)
  }

  function getColorClasses(colorValue: string): string {
    const found = COURSE_COLORS.find((c) => c.value === colorValue)
    return found ? found.value : COURSE_COLORS[0].value
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-gray-200">
          <div className="p-3 bg-gray-50 border-r border-gray-200" />
          {DAYS.map((day, i) => (
            <div
              key={i}
              className="p-3 text-center font-bold text-sm bg-gray-50 border-r border-gray-200 last:border-r-0"
            >
              <span className="text-gray-700">{day}曜日</span>
            </div>
          ))}
        </div>

        {PERIODS.map((period, pIndex) => (
          <div
            key={pIndex}
            className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-gray-200 last:border-b-0"
          >
            <div className="p-2 bg-gray-50 border-r border-gray-200 flex flex-col items-center justify-center">
              <span className="font-bold text-sm text-gray-700">{period.label}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">{period.time}</span>
            </div>

            {DAYS.map((_, dIndex) => {
              const course = getCourse(dIndex, pIndex)
              return (
                <div
                  key={dIndex}
                  className="border-r border-gray-200 last:border-r-0 p-1 min-h-[90px]"
                >
                  {course ? (
                    <button
                      onClick={() => onCourseClick(course)}
                      className={`w-full h-full rounded-lg border p-2 text-left transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${getColorClasses(course.color)}`}
                    >
                      <p className="font-bold text-xs leading-tight line-clamp-2">
                        {course.name}
                      </p>
                      {course.instructor && (
                        <p className="text-[10px] mt-1 opacity-70 truncate">
                          {course.instructor}
                        </p>
                      )}
                      {course.room && (
                        <p className="text-[10px] opacity-70 truncate">
                          {course.room}
                        </p>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => onCellClick(dIndex, pIndex)}
                      className="w-full h-full rounded-lg border border-dashed border-gray-200 flex items-center justify-center transition-all hover:border-blue-300 hover:bg-blue-50/50 group cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
