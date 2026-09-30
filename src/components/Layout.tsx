import { useState } from 'react'
import { Bell, BookOpenCheck, BriefcaseBusiness, CalendarDays, ChartNoAxesCombined, CircleDollarSign, ClipboardCheck, FileChartColumn, FileText, History, LayoutDashboard, ListChecks, LogOut, Menu, ReceiptText, Settings2, ShieldCheck, UserRound, UsersRound, X } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { Role } from '../types'
import { Avatar, Badge, Button } from './UI'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'HR STAFF', 'EMPLOYEE'] },
  { label: 'Employees', to: '/employees', icon: UsersRound, roles: ['ADMIN', 'HR STAFF'] },
  { label: 'Attendance', to: '/attendance', icon: CalendarDays, roles: ['ADMIN', 'HR STAFF'] },
  { label: 'My Attendance', to: '/attendance', icon: CalendarDays, roles: ['EMPLOYEE'] },
  { label: 'Payroll', to: '/payroll/running', icon: CircleDollarSign, roles: ['ADMIN', 'HR STAFF'] },
  { label: 'My Running Payroll', to: '/payroll/running', icon: CircleDollarSign, roles: ['EMPLOYEE'] },
  { label: 'My Profile', to: '/employees/EMP-001', icon: UserRound, roles: ['EMPLOYEE'] },
  { label: 'My Payslip', to: '/payslips/PAY-2026-09-30-001', icon: ReceiptText, roles: ['EMPLOYEE'] },
  { label: 'Compensation', to: '/compensation', icon: BriefcaseBusiness, roles: ['ADMIN', 'HR STAFF'] },
  { label: 'Claims & Reimbursement', to: '/claims', icon: ClipboardCheck, roles: ['ADMIN', 'HR STAFF'] },
  { label: 'My Claims', to: '/claims', icon: ClipboardCheck, roles: ['EMPLOYEE'] },
  { label: 'HMO & Benefits', to: '/benefits', icon: ShieldCheck, roles: ['ADMIN', 'HR STAFF'] },
  { label: 'My Benefits', to: '/benefits', icon: ShieldCheck, roles: ['EMPLOYEE'] },
  { label: 'Reports', to: '/reports', icon: FileChartColumn, roles: ['ADMIN', 'HR STAFF'] },
  { label: 'Salary History', to: '/salary-history', icon: History, roles: ['EMPLOYEE'] },
  { label: 'Audit Log', to: '/audit-log', icon: BookOpenCheck, roles: ['ADMIN'] },
]

export function AppLayout() {
  const { role, setRole, signOut } = useApp()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const roleItems = navItems.filter((item) => item.roles.includes(role))
  const roleLabel = role === 'ADMIN' ? 'Administrator' : role === 'HR STAFF' ? 'HR Staff' : 'Employee'
  return <div className="app-shell">
    <aside className={`sidebar ${drawerOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><span></span><span></span><i></i></div><div><strong>ARCHON NELL</strong><small>Payroll & Benefits</small></div><button className="icon-btn mobile-only" onClick={() => setDrawerOpen(false)} aria-label="Close menu"><X size={18}/></button></div>
      <div className="demo-role"><div><span className="eyebrow">DEMO ROLE</span><strong>{role}</strong></div><select value={role} onChange={(event) => setRole(event.target.value as Role)} aria-label="Switch demo role"><option>ADMIN</option><option>HR STAFF</option><option>EMPLOYEE</option></select></div>
      <nav className="nav-list">{roleItems.map((item) => { const Icon = item.icon; return <NavLink key={item.label} to={item.to} className={({ isActive }) => `nav-item ${isActive || (item.to === '/payroll/running' && location.pathname.startsWith('/payslips')) ? 'active' : ''}`} onClick={() => setDrawerOpen(false)}><Icon size={18}/><span>{item.label}</span></NavLink> })}</nav>
      <div className="sidebar-foot"><div className="sidebar-note"><Settings2 size={16}/><span>Prototype mode<br/><small>API connection pending</small></span></div><button className="nav-item" onClick={() => { signOut(); navigate('/login') }}><LogOut size={18}/><span>Sign out</span></button></div>
    </aside>
    {drawerOpen && <div className="drawer-scrim" onClick={() => setDrawerOpen(false)} />}
    <main className="main-area"><header className="topbar"><button className="icon-btn mobile-menu" onClick={() => setDrawerOpen(true)} aria-label="Open menu"><Menu size={20}/></button><div className="topbar-context"><span className="topbar-dot"></span><span>Payroll workspace</span><span className="muted">/</span><span className="muted">September 2026</span></div><div className="topbar-actions"><button className="icon-btn notification" aria-label="Notifications"><Bell size={19}/><i></i></button><div className="profile-menu"><Avatar initials={role === 'EMPLOYEE' ? 'JD' : 'MS'} tone="navy"/><div className="profile-copy"><strong>{role === 'EMPLOYEE' ? 'Juan Dela Cruz' : 'Maria Santos'}</strong><span>{roleLabel}</span></div></div></div></header><div className="page-content"><Outlet /></div><footer className="app-footer"><span>Archon Nell Incorporated · Payroll and Benefits Management System</span><span><span className="footer-dot"></span> Frontend prototype · Sample data only</span></footer></main>
  </div>
}
