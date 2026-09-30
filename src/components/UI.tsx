import type { ReactNode } from 'react'
import { Check, CircleAlert, Info, LoaderCircle, X } from 'lucide-react'

export function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', disabled = false, className = '' }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md'; onClick?: () => void; type?: 'button' | 'submit'; disabled?: boolean; className?: string }) {
  return <button className={`btn btn-${variant} btn-${size} ${className}`} type={type} onClick={onClick} disabled={disabled}>{children}</button>
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'teal' | 'info' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function Card({ children, className = '', title, action }: { children: ReactNode; className?: string; title?: string; action?: ReactNode }) {
  return <section className={`card ${className}`}>{(title || action) && <div className="card-head"><h3>{title}</h3>{action}</div>}{children}</section>
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="page-header"><div><span className="eyebrow">{eyebrow ?? 'Archon Nell Incorporated'}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div className="header-actions">{action}</div>}</div>
}

export function StatusState({ kind, title, message, action }: { kind: 'loading' | 'empty' | 'error' | 'success'; title: string; message?: string; action?: ReactNode }) {
  const Icon = kind === 'loading' ? LoaderCircle : kind === 'error' ? CircleAlert : kind === 'success' ? Check : Info
  return <div className={`state state-${kind}`}><Icon size={18} className={kind === 'loading' ? 'spin' : ''}/><div><strong>{title}</strong>{message && <p>{message}</p>}{action}</div></div>
}

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><div className="modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><h2>{title}</h2><button className="icon-btn" onClick={onClose} aria-label="Close"><X size={18}/></button></div>{children}</div></div>
}

export function Money({ value, muted = false }: { value: number; muted?: boolean }) {
  return <span className={muted ? 'muted' : ''}>₱{value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
}

export function Avatar({ initials, tone = 'teal' }: { initials: string; tone?: 'teal' | 'navy' | 'gold' }) {
  return <span className={`avatar avatar-${tone}`}>{initials}</span>
}
