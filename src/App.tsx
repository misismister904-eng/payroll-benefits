import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/Layout'
import { useApp } from './context/AppContext'
import { AnalyticsPage, AttendancePage, AuditLogPage, BenefitsPage, ClaimsPage, CompensationPage, DashboardPage, DeductionsPage, EmployeeProfilePage, EmployeesPage, LoginPage, PayslipPage, ReportsPage, RunningPayrollPage, SalaryHistoryPage } from './pages/Pages'

function RequireSession() {
  const { signedIn } = useApp()
  return signedIn ? <AppLayout /> : <Navigate to="/login" replace />
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<RequireSession />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/employees" element={<EmployeesPage />} />
      <Route path="/employees/:employeeId" element={<EmployeeProfilePage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/payroll/running" element={<RunningPayrollPage />} />
      <Route path="/deductions" element={<DeductionsPage />} />
      <Route path="/payslips/:payslipId" element={<PayslipPage />} />
      <Route path="/compensation" element={<CompensationPage />} />
      <Route path="/claims" element={<ClaimsPage />} />
      <Route path="/benefits" element={<BenefitsPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/salary-history" element={<SalaryHistoryPage />} />
      <Route path="/audit-log" element={<AuditLogPage />} />
    </Route>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
}
