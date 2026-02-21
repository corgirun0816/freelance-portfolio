"use client"

import { useState, useEffect } from "react"
import { Course, DAYS, PERIODS, COURSE_COLORS } from "@/lib/types"
import { generateId } from "@/lib/storage"
import { X, Trash2 } from "lucide-react"

interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (course: Course) => void
  onDelete?: (id: string) => void
  course?: Course | null
  defaultDayIndex?: number
  defaultPeriodIndex?: number
}

export function CourseModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  course,
  defaultDayIndex = 0,
  defaultPeriodIndex = 0,
}: CourseModalProps) {
  const [name, setName] = useState("")
  const [instructor, setInstructor] = useState("")
  const [room, setRoom] = useState("")
  const [color, setColor] = useState<string>(COURSE_COLORS[0].value)
  const [dayIndex, setDayIndex] = useState(defaultDayIndex)
  const [periodIndex, setPeriodIndex] = useState(defaultPeriodIndex)
  const [notes, setNotes] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const isEditing = !!course

  useEffect(() => {
    if (course) {
      setName(course.name)
      setInstructor(course.instructor)
      setRoom(course.room)
      setColor(course.color)
      setDayIndex(course.dayIndex)
      setPeriodIndex(course.periodIndex)
      setNotes(course.notes)
    } else {
      setName("")
      setInstructor("")
      setRoom("")
      setColor(COURSE_COLORS[0].value)
      setDayIndex(defaultDayIndex)
      setPeriodIndex(defaultPeriodIndex)
      setNotes("")
    }
    setShowDeleteConfirm(false)
  }, [course, defaultDayIndex, defaultPeriodIndex, isOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onSave({
      id: course?.id || generateId(),
      name: name.trim(),
      instructor: instructor.trim(),
      room: room.trim(),
      color,
      dayIndex,
      periodIndex,
      notes: notes.trim(),
    })
    onClose()
  }

  function handleDelete() {
    if (course && onDelete) {
      onDelete(course.id)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            {isEditing ? "授業を編集" : "授業を追加"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              科目名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: 情報工学概論"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              required
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                曜日
              </label>
              <select
                value={dayIndex}
                onChange={(e) => setDayIndex(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-white"
              >
                {DAYS.map((day, i) => (
                  <option key={i} value={i}>
                    {day}曜日
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                時限
              </label>
              <select
                value={periodIndex}
                onChange={(e) => setPeriodIndex(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-white"
              >
                {PERIODS.map((period, i) => (
                  <option key={i} value={i}>
                    {period.label}（{period.time}）
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              担当教員
            </label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="例: 山田太郎"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              教室
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="例: A棟301"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              色
            </label>
            <div className="flex flex-wrap gap-2">
              {COURSE_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                    color === c.value
                      ? "border-gray-800 scale-110 shadow-md"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              メモ
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="備考があれば入力..."
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            {isEditing && onDelete && (
              <div className="relative">
                {showDeleteConfirm ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors cursor-pointer"
                    >
                      削除する
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                    >
                      キャンセル
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                    title="削除"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            <div className="flex-1" />
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm cursor-pointer"
            >
              {isEditing ? "更新" : "追加"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
