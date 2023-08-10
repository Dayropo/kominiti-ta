import { ReactNode, createContext, useEffect, useState } from "react"
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
  const [isLoading, setIsLoading] = useState(true)

  const updateEmployee = (id: number, fullname: string) => {
    employees.filter((employee: IsEmployee) => {
      if (employee.user_id === id) {
        employee.fullname = fullname
        setEmployees([...employees])
        localStorage.setItem("employees", JSON.stringify([...employees]))
      }
    })
  }

  const deleteEmployee = (id: number) => {
    const filteredArray = employees.filter(
      (employee: IsEmployee) => employee.user_id !== id
    )
    setEmployees(filteredArray)
    localStorage.setItem("employees", JSON.stringify(filteredArray))
  }

  useEffect(() => {
    let isMounted = true
    const _employees = localStorage.getItem("employees")

    if (_employees) {
      isMounted && setEmployees(JSON.parse(_employees))
      isMounted && setIsLoading(false)
    } else {
      setTimeout(() => {
        isMounted && setIsLoading(false)
      }, 1000)
    }

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        updateEmployee,
        deleteEmployee,
        isLoading,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}

export default EmployeeContextProvider
