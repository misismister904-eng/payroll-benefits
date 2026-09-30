export type Role = 'ADMIN' | 'HR STAFF' | 'EMPLOYEE'
export type Status = 'Active' | 'Inactive' | 'Pending' | 'Approved' | 'Rejected' | 'Present' | 'Absent' | 'RUNNING' | 'FINAL' | 'Successful'

export interface Employee {
  id: string
  name: string
  department: string
  position: string
  salary: number
  status: 'Active' | 'Inactive'
  email: string
  initials: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  date: string
  timeIn: string
  timeOut: string
  status: 'Present' | 'Absent' | 'Pending'
  totalHours: number
  overtime: number
}

export interface Deduction {
  id: string
  type: 'SSS' | 'PhilHealth' | 'Pag-IBIG' | 'Withholding Tax' | 'Other Deductions'
  amount: number
  period: string
  status: 'Estimated' | 'Applied' | 'Pending'
}

export interface PayrollComputation {
  id: string
  employeeId: string
  period: string
  basicSalary: number
  daysWorked: number
  workedHours: number
  overtimeHours: number
  overtimePay: number
  allowances: number
  grossPay: number
  deductions: number
  benefits: number
  netPay: number
  status: 'RUNNING' | 'FINAL'
}

export interface Claim { id: string; employee: string; type: string; amount: number; submitted: string; status: 'Pending' | 'Approved' | 'Rejected' }
export interface BenefitEnrollment { employee: string; plan: string; status: 'Enrolled' | 'For review' | 'Not enrolled'; coverage: string; dependents: number; contribution: number }
export interface SalaryHistoryEntry { date: string; previous: number; next: number; adjustment: string; reason: string; updatedBy: string }
export interface AuditEntry { date: string; user: string; action: string; module: string; status: 'Successful' | 'Pending' | 'Failed' }
export interface NavItem { label: string; to: string; icon: string; roles: Role[] }
