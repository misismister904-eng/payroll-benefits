import type { AttendanceRecord, AuditEntry, BenefitEnrollment, Claim, Deduction, Employee, PayrollComputation, SalaryHistoryEntry } from '../types'

export const employees: Employee[] = [
  { id: 'EMP-001', name: 'Juan Dela Cruz', department: 'Engineering', position: 'Software Developer', salary: 42000, status: 'Active', email: 'juan.delacruz@archonnell.com', initials: 'JD' },
  { id: 'EMP-002', name: 'Maria Santos', department: 'Human Resources', position: 'HR Specialist', salary: 38500, status: 'Active', email: 'maria.santos@archonnell.com', initials: 'MS' },
  { id: 'EMP-003', name: 'Rafael Lim', department: 'Finance', position: 'Payroll Analyst', salary: 45000, status: 'Active', email: 'rafael.lim@archonnell.com', initials: 'RL' },
  { id: 'EMP-004', name: 'Bea Navarro', department: 'Operations', position: 'Operations Lead', salary: 51000, status: 'Active', email: 'bea.navarro@archonnell.com', initials: 'BN' },
  { id: 'EMP-005', name: 'Carlo Mendoza', department: 'Engineering', position: 'QA Engineer', salary: 36000, status: 'Inactive', email: 'carlo.mendoza@archonnell.com', initials: 'CM' },
]

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'ATT-1001', employeeId: 'EMP-001', date: '2026-09-30', timeIn: '08:00', timeOut: '17:00', status: 'Present', totalHours: 8, overtime: 0 },
  { id: 'ATT-1002', employeeId: 'EMP-002', date: '2026-09-30', timeIn: '08:12', timeOut: '17:08', status: 'Present', totalHours: 8, overtime: 0 },
  { id: 'ATT-1003', employeeId: 'EMP-003', date: '2026-09-30', timeIn: '07:55', timeOut: '18:30', status: 'Present', totalHours: 8, overtime: 1.58 },
  { id: 'ATT-1004', employeeId: 'EMP-004', date: '2026-09-30', timeIn: '08:05', timeOut: '17:00', status: 'Present', totalHours: 8, overtime: 0 },
]

export const deductions: Deduction[] = [
  { id: 'DED-01', type: 'SSS', amount: 1400, period: 'Sep 16–30, 2026', status: 'Estimated' },
  { id: 'DED-02', type: 'PhilHealth', amount: 875, period: 'Sep 16–30, 2026', status: 'Estimated' },
  { id: 'DED-03', type: 'Pag-IBIG', amount: 200, period: 'Sep 16–30, 2026', status: 'Estimated' },
  { id: 'DED-04', type: 'Withholding Tax', amount: 2350, period: 'Sep 16–30, 2026', status: 'Estimated' },
  { id: 'DED-05', type: 'Other Deductions', amount: 500, period: 'Sep 16–30, 2026', status: 'Pending' },
]

export const runningPayroll: PayrollComputation = {
  id: 'PAY-2026-09-30-001', employeeId: 'EMP-001', period: 'September 16–30, 2026', basicSalary: 21000,
  daysWorked: 1, regularHours: 8, workedHours: 8, overtimeHours: 0, overtimePay: 0, allowances: 1200, grossPay: 22200,
  deductions: 5325, benefits: 500, netPay: 17375, status: 'RUNNING',
}

export const claims: Claim[] = [
  { id: 'CLM-2401', employee: 'Maria Santos', type: 'Medical reimbursement', amount: 3250, submitted: 'Sep 29, 2026', status: 'Pending' },
  { id: 'CLM-2400', employee: 'Juan Dela Cruz', type: 'Transportation', amount: 980, submitted: 'Sep 28, 2026', status: 'Approved' },
  { id: 'CLM-2398', employee: 'Bea Navarro', type: 'Client meeting', amount: 2400, submitted: 'Sep 25, 2026', status: 'Approved' },
  { id: 'CLM-2392', employee: 'Carlo Mendoza', type: 'Office supplies', amount: 740, submitted: 'Sep 21, 2026', status: 'Rejected' },
]

export const benefits: BenefitEnrollment[] = [
  { employee: 'Juan Dela Cruz', plan: 'Archon Care Plus', status: 'Enrolled', coverage: 'Employee + 1 dependent', dependents: 1, contribution: 1250 },
  { employee: 'Maria Santos', plan: 'Archon Care Plus', status: 'Enrolled', coverage: 'Employee only', dependents: 0, contribution: 950 },
  { employee: 'Rafael Lim', plan: 'Archon Care Basic', status: 'For review', coverage: 'Employee only', dependents: 0, contribution: 650 },
  { employee: 'Bea Navarro', plan: 'Archon Care Plus', status: 'Enrolled', coverage: 'Employee + 2 dependents', dependents: 2, contribution: 1650 },
]

export const salaryHistory: SalaryHistoryEntry[] = [
  { date: 'Jul 01, 2026', previous: 39000, next: 42000, adjustment: '+7.7%', reason: 'Annual performance review', updatedBy: 'Maria Santos' },
  { date: 'Jan 01, 2026', previous: 36000, next: 39000, adjustment: '+8.3%', reason: 'Role progression', updatedBy: 'Rafael Lim' },
  { date: 'Jun 15, 2025', previous: 32000, next: 36000, adjustment: '+12.5%', reason: 'Promotion to Software Developer', updatedBy: 'Maria Santos' },
]

export const auditEntries: AuditEntry[] = [
  { date: 'Sep 30, 2026 · 10:42 AM', user: 'HR Staff', action: 'Process Payroll', module: 'Payroll', status: 'Successful' },
  { date: 'Sep 30, 2026 · 09:30 AM', user: 'Maria Santos', action: 'Record Attendance', module: 'Attendance', status: 'Successful' },
  { date: 'Sep 29, 2026 · 04:18 PM', user: 'Admin', action: 'Approve Claim CLM-2400', module: 'Claims', status: 'Successful' },
  { date: 'Sep 29, 2026 · 02:10 PM', user: 'Rafael Lim', action: 'Update deduction estimate', module: 'Deductions', status: 'Successful' },
]

export const payrollTrend = [
  { period: 'May 1–15', payroll: 280000 }, { period: 'May 16–31', payroll: 294000 }, { period: 'Jun 1–15', payroll: 301000 },
  { period: 'Jun 16–30', payroll: 312000 }, { period: 'Jul 1–15', payroll: 318000 }, { period: 'Jul 16–31', payroll: 325000 },
  { period: 'Aug 1–15', payroll: 329000 }, { period: 'Aug 16–31', payroll: 336000 }, { period: 'Sep 1–15', payroll: 344000 }, { period: 'Sep 16–30', payroll: 351000 },
]

export const deductionSummary = [
  { name: 'SSS', amount: 72000, fill: '#0e8f83' }, { name: 'PhilHealth', amount: 51000, fill: '#3b82a0' }, { name: 'Pag-IBIG', amount: 18000, fill: '#8c6a47' }, { name: 'Tax', amount: 94000, fill: '#e2a93b' },
]
