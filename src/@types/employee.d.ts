export interface IsEmployee {
  user_id: number
  fullname: string
  priority: number
  created_at: string
  updated_at: string
}

export type EmployeeContextType = {
  employees: IsEmployee[]
  updateEmployee: (id: number, fullname: string) => void
  deleteEmployee: (id: number) => void
}
