import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { attendanceRecords, deductions as initialDeductions, employees, runningPayroll } from '../data/mockData'
import type { AttendanceRecord, Deduction, Employee, PayrollComputation, Role } from '../types'

interface AppContextValue {
  role: Role
  setRole: (role: Role) => void
  signedIn: boolean
  signIn: () => void
  signOut: () => void
  attendance: AttendanceRecord[]
  payroll: PayrollComputation
  deductions: Deduction[]
  addAttendance: (record: AttendanceRecord) => void
  updateDeduction: (id: string, amount: number) => void
  selectedEmployee: Employee
  currentEmployee: Employee
}

const AppContext = createContext<AppContextValue | null>(null)
export const WORKDAY_HOURS = 8

export function calculateHours(timeIn: string, timeOut: string) {
  const [inHours, inMinutes] = timeIn.split(':').map(Number)
  const [outHours, outMinutes] = timeOut.split(':').map(Number)
  const total = Math.max(0, (outHours * 60 + outMinutes - (inHours * 60 + inMinutes)) / 60)
  const worked = Math.min(WORKDAY_HOURS, Math.max(0, total - (total >= 5 ? 1 : 0)))
  const overtime = Math.max(0, total - WORKDAY_HOURS - (total >= 5 ? 1 : 0))
  return { totalHours: Number(worked.toFixed(2)), overtime: Number(overtime.toFixed(2)), rawHours: Number(total.toFixed(2)) }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('ADMIN')
  const [signedIn, setSignedIn] = useState(true)
  const [attendance, setAttendance] = useState(attendanceRecords)
  const [deductions, setDeductions] = useState(initialDeductions)
  const [payroll, setPayroll] = useState(runningPayroll)

  const addAttendance = (record: AttendanceRecord) => {
    setAttendance((current) => [record, ...current])
    if (record.employeeId === 'EMP-001') {
      setPayroll((current) => ({ ...current, daysWorked: 1, workedHours: record.totalHours, overtimeHours: record.overtime, overtimePay: record.overtime * 325, grossPay: current.basicSalary + current.allowances + record.overtime * 325, netPay: current.basicSalary + current.allowances + record.overtime * 325 - current.deductions + current.benefits }))
    }
  }
  const updateDeduction = (id: string, amount: number) => {
    const nextDeductions = deductions.map((item) => item.id === id ? { ...item, amount, status: 'Applied' as const } : item)
    setDeductions(nextDeductions)
    setPayroll((current) => {
      const nextTotal = nextDeductions.reduce((sum, item) => sum + item.amount, 0)
      return { ...current, deductions: nextTotal, netPay: current.grossPay - nextTotal + current.benefits }
    })
  }

  const value = useMemo(() => ({ role, setRole, signedIn, signIn: () => setSignedIn(true), signOut: () => setSignedIn(false), attendance, payroll, deductions, addAttendance, updateDeduction, selectedEmployee: employees[0], currentEmployee: employees[0] }), [role, signedIn, attendance, payroll, deductions])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
