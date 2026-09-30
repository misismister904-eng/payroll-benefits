import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { attendanceRecords, deductions as initialDeductions, employees, runningPayroll } from '../data/mockData'
import type { AttendanceRecord, Deduction, Employee, PayrollComputation, Role } from '../types'

export interface EmployeePayrollState {
  attendance: AttendanceRecord[]
  deductions: Deduction[]
  payroll: PayrollComputation
}

interface AppContextValue {
  role: Role
  setRole: (role: Role) => void
  signedIn: boolean
  signIn: () => void
  signOut: () => void
  attendance: AttendanceRecord[]
  payroll: PayrollComputation
  deductions: Deduction[]
  employeeStates: Record<string, EmployeePayrollState>
  selectedEmployee: Employee
  currentEmployee: Employee
  selectEmployee: (employeeId: string) => void
  getEmployeeState: (employeeId: string) => EmployeePayrollState
  getEmployeeIdByPayrollId: (payrollId: string) => string | undefined
  addAttendance: (record: AttendanceRecord) => void
  updateDeduction: (employeeId: string, id: string, amount: number) => void
}

const AppContext = createContext<AppContextValue | null>(null)
export const WORKDAY_HOURS = 8
const OVERTIME_RATE = 325
const SAMPLE_BENEFITS_CONTRIBUTION = 500

export function calculateHours(timeIn: string, timeOut: string) {
  const [inHours, inMinutes] = timeIn.split(':').map(Number)
  const [outHours, outMinutes] = timeOut.split(':').map(Number)
  const total = Math.max(0, (outHours * 60 + outMinutes - (inHours * 60 + inMinutes)) / 60)
  const breakHours = total >= 5 ? 1 : 0
  const regularHours = Math.min(WORKDAY_HOURS, Math.max(0, total - breakHours))
  const overtime = Math.max(0, total - WORKDAY_HOURS - breakHours)
  return {
    totalHours: Number(regularHours.toFixed(2)),
    regularHours: Number(regularHours.toFixed(2)),
    overtime: Number(overtime.toFixed(2)),
    rawHours: Number(total.toFixed(2)),
  }
}

function cloneDeductions() {
  return initialDeductions.map((item) => ({ ...item }))
}

function buildPayroll(employee: Employee, employeeAttendance: AttendanceRecord[], employeeDeductions: Deduction[]): PayrollComputation {
  if (employee.id === runningPayroll.employeeId) return { ...runningPayroll }

  const workedHours = employeeAttendance.reduce((total, record) => total + record.totalHours, 0)
  const overtimeHours = employeeAttendance.reduce((total, record) => total + record.overtime, 0)
  const basicSalary = Math.round(employee.salary / 2)
  const allowances = 1200
  const overtimePay = overtimeHours * OVERTIME_RATE
  const grossPay = basicSalary + allowances + overtimePay
  const deductionTotal = employeeDeductions.reduce((total, item) => total + item.amount, 0)

  return {
    id: `PAY-${employee.id}-2026-09-30`,
    employeeId: employee.id,
    period: runningPayroll.period,
    basicSalary,
    daysWorked: employeeAttendance.length,
    workedHours,
    overtimeHours,
    overtimePay,
    allowances,
    grossPay,
    deductions: deductionTotal,
    benefits: SAMPLE_BENEFITS_CONTRIBUTION,
    netPay: grossPay - deductionTotal + SAMPLE_BENEFITS_CONTRIBUTION,
    status: 'RUNNING',
  }
}

function buildEmployeeStates(): Record<string, EmployeePayrollState> {
  return Object.fromEntries(employees.map((employee) => {
    const employeeAttendance = attendanceRecords.filter((record) => record.employeeId === employee.id)
    const employeeDeductions = cloneDeductions()
    return [employee.id, {
      attendance: employeeAttendance,
      deductions: employeeDeductions,
      payroll: buildPayroll(employee, employeeAttendance, employeeDeductions),
    }]
  }))
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('ADMIN')
  const [signedIn, setSignedIn] = useState(true)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employees[0].id)
  const [employeeStates, setEmployeeStates] = useState<Record<string, EmployeePayrollState>>(buildEmployeeStates)

  const selectedEmployee = employees.find((employee) => employee.id === selectedEmployeeId) ?? employees[0]
  const selectedState = employeeStates[selectedEmployee.id]
  const attendance = Object.values(employeeStates).flatMap((state) => state.attendance)

  const selectEmployee = (employeeId: string) => {
    if (employees.some((employee) => employee.id === employeeId)) setSelectedEmployeeId(employeeId)
  }

  const getEmployeeState = (employeeId: string) => employeeStates[employeeId] ?? employeeStates[employees[0].id]
  const getEmployeeIdByPayrollId = (payrollId: string) => Object.values(employeeStates).find((state) => state.payroll.id === payrollId)?.payroll.employeeId

  const addAttendance = (record: AttendanceRecord) => {
    setSelectedEmployeeId(record.employeeId)
    setEmployeeStates((current) => {
      const state = current[record.employeeId]
      if (!state) return current
      const nextAttendance = [record, ...state.attendance]
      const currentPayroll = state.payroll
      const nextOvertimeHours = nextAttendance.reduce((total, item) => total + item.overtime, 0)
      const grossPay = currentPayroll.basicSalary + currentPayroll.allowances + nextOvertimeHours * OVERTIME_RATE
      const nextPayroll: PayrollComputation = {
        ...currentPayroll,
        daysWorked: nextAttendance.length,
        workedHours: nextAttendance.reduce((total, item) => total + item.totalHours, 0),
        overtimeHours: nextOvertimeHours,
        overtimePay: nextOvertimeHours * OVERTIME_RATE,
        grossPay,
        netPay: grossPay - currentPayroll.deductions + currentPayroll.benefits,
      }
      return { ...current, [record.employeeId]: { ...state, attendance: nextAttendance, payroll: nextPayroll } }
    })
  }

  const updateDeduction = (employeeId: string, id: string, amount: number) => {
    setEmployeeStates((current) => {
      const state = current[employeeId]
      if (!state) return current
      const nextDeductions = state.deductions.map((item) => item.id === id ? { ...item, amount, status: 'Applied' as const } : item)
      const nextTotal = nextDeductions.reduce((sum, item) => sum + item.amount, 0)
      const nextPayroll = { ...state.payroll, deductions: nextTotal, netPay: state.payroll.grossPay - nextTotal + state.payroll.benefits }
      return { ...current, [employeeId]: { ...state, deductions: nextDeductions, payroll: nextPayroll } }
    })
  }

  const value = useMemo(() => ({
    role,
    setRole,
    signedIn,
    signIn: () => setSignedIn(true),
    signOut: () => setSignedIn(false),
    attendance,
    payroll: selectedState.payroll,
    deductions: selectedState.deductions,
    employeeStates,
    selectedEmployee,
    currentEmployee: selectedEmployee,
    selectEmployee,
    getEmployeeState,
    getEmployeeIdByPayrollId,
    addAttendance,
    updateDeduction,
  }), [role, signedIn, attendance, employeeStates, selectedEmployee, selectedState])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
