import type { AttendanceRecord } from '../types'

export interface AttendanceService {
  list(period: string): Promise<AttendanceRecord[]>
  create(record: Omit<AttendanceRecord, 'id'>): Promise<AttendanceRecord>
}

export const attendanceService: AttendanceService = {
  async list() { throw new Error('Attendance API is not connected in the UI prototype.') },
  async create() { throw new Error('Attendance API is not connected in the UI prototype.') },
}
