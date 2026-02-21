"use client"

import { useState, useEffect, useCallback } from "react"
import { Course } from "@/lib/types"
import { loadCourses, saveCourses, loadSemesterName, saveSemesterName } from "@/lib/storage"
import { TimetableGrid } from "@/components/TimetableGrid"
import { CourseModal } from "@/components/CourseModal"
import { CourseStats } from "@/components/CourseStats"
import { GraduationCap, Download, Upload, Pencil, Check } from "lucide-react"

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [mounted, setMounted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [defaultDay, setDefaultDay] = useState(0)
  const [defaultPeriod, setDefaultPeriod] = useState(0)
  const [semesterName, setSemesterName] = useState("2026年度 前期")
  const [editingSemester, setEditingSemester] = useState(false)
  const [semesterInput, setSemesterInput] = useState("")

  useEffect(() => {
    setCourses(loadCourses())
    setSemesterName(loadSemesterName())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) saveCourses(courses)
  }, [courses, mounted])

  const handleCellClick = useCallback((dayIndex: number, periodIndex: number) => {
    setEditingCourse(null)
    setDefaultDay(dayIndex)
    setDefaultPeriod(periodIndex)
    setModalOpen(true)
  }, [])

  const handleCourseClick = useCallback((course: Course) => {
    setEditingCourse(course)
    setModalOpen(true)
  }, [])

  const handleSave = useCallback((course: Course) => {
    setCourses((prev) => {
      const existing = prev.findIndex((c) => c.id === course.id)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = course
        return updated
      }
      return [...prev, course]
    })
  }, [])

  const handleDelete = useCallback((id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const handleExport = useCallback(() => {
    const data = JSON.stringify({ semesterName, courses }, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `timetable-${semesterName.replace(/\s+/g, "_")}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [semesterName, courses])

  const handleImport = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string)
          if (data.courses && Array.isArray(data.courses)) {
            setCourses(data.courses)
            if (data.semesterName) {
              setSemesterName(data.semesterName)
              saveSemesterName(data.semesterName)
            }
          }
        } catch {
          alert("ファイルの読み込みに失敗しました。正しいJSONファイルを選択してください。")
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }, [])

  const handleSemesterEdit = useCallback(() => {
    setEditingSemester(true)
    setSemesterInput(semesterName)
  }, [semesterName])

  const handleSemesterSave = useCallback(() => {
    const newName = semesterInput.trim() || "2026年度 前期"
    setSemesterName(newName)
    saveSemesterName(newName)
    setEditingSemester(false)
  }, [semesterInput])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400">読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">時間割管理</h1>
                <div className="flex items-center gap-1.5">
                  {editingSemester ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={semesterInput}
                        onChange={(e) => setSemesterInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSemesterSave()}
                        className="text-sm text-gray-500 border border-gray-300 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
                        autoFocus
                      />
                      <button
                        onClick={handleSemesterSave}
                        className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">{semesterName}</p>
                      <button
                        onClick={handleSemesterEdit}
                        className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        <Pencil className="w-3 h-3 text-gray-400" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleImport}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                インポート
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                エクスポート
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <CourseStats courses={courses} />

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <TimetableGrid
            courses={courses}
            onCellClick={handleCellClick}
            onCourseClick={handleCourseClick}
          />
        </div>

        <p className="text-center text-xs text-gray-400 pb-4">
          データはブラウザのローカルストレージに保存されます
        </p>
      </main>

      <CourseModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingCourse(null)
        }}
        onSave={handleSave}
        onDelete={handleDelete}
        course={editingCourse}
        defaultDayIndex={defaultDay}
        defaultPeriodIndex={defaultPeriod}
      />
    </div>
  )
}
