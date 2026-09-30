import type { PayrollComputation } from '../types'

export interface PayrollService {
  getRunning(employeeId: string, period: string): Promise<PayrollComputation>
  finalize(payrollId: string): Promise<PayrollComputation>
}

export const payrollService: PayrollService = {
  async getRunning() { throw new Error('Payroll API is not connected in the UI prototype.') },
  async finalize() { throw new Error('Payroll API is not connected in the UI prototype.') },
}
