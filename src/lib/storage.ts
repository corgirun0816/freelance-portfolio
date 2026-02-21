import { Course } from "./types"

const STORAGE_KEY = "university-timetable-courses"
const SEMESTER_KEY = "university-timetable-semester"

export function loadCourses(): Course[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveCourses(courses: Course[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses))
}

export function loadSemesterName(): string {
  if (typeof window === "undefined") return ""
  return localStorage.getItem(SEMESTER_KEY) || "2026年度 前期"
}

export function saveSemesterName(name: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(SEMESTER_KEY, name)
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
