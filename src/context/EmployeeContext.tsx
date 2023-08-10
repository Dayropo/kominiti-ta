import { ReactNode, createContext, useState } from "react"
import data from "../utils/users.json"
import { EmployeeContextType, IsEmployee } from "../@types/employee"

type EmployeeContextProviderProps = {
  children: ReactNode
}

export const EmployeeContext = createContext<EmployeeContextType | null>(null)

const EmployeeContextProvider = ({
  children,
}: EmployeeContextProviderProps) => {
  const [employees, setEmployees] = useState<IsEmployee[]>(data)

  const updateEmployee = (id: number, fullname: string) => {
    employees.filter((employee: IsEmployee) => {
      if (employee.user_id === id) {
        employee.fullname = fullname
        setEmployees([...employees])
      }
    })
  }

  const deleteEmployee = (id: number) => {
    const filteredArray = employees.filter(
      (employee: IsEmployee) => employee.user_id !== id
    )
    console.log(filteredArray)
    setEmployees(filteredArray)
  }

  console.log({ employees })

  return (
    <EmployeeContext.Provider
      value={{ employees, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}

export default EmployeeContextProvider
