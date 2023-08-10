import { DragEvent, useContext, useRef, useState } from "react"
import Header from "../components/ui/Header"
import { FiSearch } from "react-icons/fi"
import { EmployeeContext } from "../context/EmployeeContext"
import { EmployeeContextType, IsEmployee } from "../@types/employee"
import { PiDotsSixVerticalBold } from "react-icons/pi"
import { RiEditLine, RiDeleteBin5Line } from "react-icons/ri"
import Pagination from "../components/ui/Pagination"
import EditModal from "../components/ui/EditModal"
import DeleteModal from "../components/ui/DeleteModal"

const Employees = () => {
  const { employees, setEmployees } = useContext(
    EmployeeContext
  ) as EmployeeContextType
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [employeesPerPage] = useState<number>(6)

  const indexOfLastEmployee = currentPage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  )

  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [item, setItem] = useState<IsEmployee>()

  const dragItemRef = useRef<any>(null)
  const dragOverItemRef = useRef<any>(null)

  const handleDragStart = (employee: IsEmployee) => {
    const index = employees.findIndex(item => item.user_id === employee.user_id)

    dragItemRef.current = index
  }

  const handleDragEnter = (employee: IsEmployee) => {
    const index = employees.findIndex(item => item.user_id === employee.user_id)

    dragOverItemRef.current = index
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleSort = () => {
    let _employees = [...employees]
    const draggedItem = _employees.splice(dragItemRef.current, 1)[0]

    _employees.splice(dragOverItemRef.current, 0, draggedItem)

    dragItemRef.current = null
    dragOverItemRef.current = null

    setEmployees(_employees)
  }

  return (
    <div className="min-h-screen bg-gray-100 font-poppins">
      {showEditModal && (
        <EditModal setShowEditModal={setShowEditModal} item={item} />
      )}

      {showDeleteModal && (
        <DeleteModal setShowDeleteModal={setShowDeleteModal} item={item} />
      )}

      <Header />

      <div className="px-8 py-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold ">Employees</p>

          <div className="relative">
            <input
              type="search"
              name=""
              id=""
              className="rounded-full py-2 pl-10 pr-4 text-sm focus:outline-1 focus:outline-green-300"
            />
            <FiSearch
              className="text-green-600 absolute left-2.5 top-2 cursor-pointer"
              size={20}
            />
          </div>
        </div>

        {/* employees list */}
        {employees.length > 0 && (
          <div className="mt-6 space-y-6">
            <div className="bg-white px-8 py-4 w-full rounded-sm flex items-center gap-8 cursor-default">
              <div className="w-1/5 font-semibold text-sm"></div>
              <div className="w-1/5 font-semibold text-sm ">id</div>
              <div className="w-1/2 font-semibold text-sm">Full name</div>
              <div className="w-[10%] font-semibold text-sm">Action</div>
            </div>

            <div className="space-y-3">
              {currentEmployees.map((employee: IsEmployee, index) => (
                <div
                  className="bg-white px-8 py-4 w-full rounded-sm flex items-center gap-8 cursor-pointer"
                  key={employee.user_id}
                  draggable
                  onDragStart={() => handleDragStart(employee)}
                  onDragEnter={() => handleDragEnter(employee)}
                  onDragEnd={handleSort}
                  onDragOver={handleDragOver}
                >
                  <div className="w-1/5 text-sm">
                    <PiDotsSixVerticalBold size={20} />
                  </div>
                  <div className="w-1/5 text-sm ">{employee.user_id}</div>
                  <div className="w-1/2 text-sm">{employee.fullname}</div>
                  <div className="w-[10%] text-sm flex gap-8">
                    <RiEditLine
                      size={16}
                      className="text-green-800 hover:text-green-500"
                      onClick={() => {
                        setShowEditModal(true)
                        setItem(employee)
                      }}
                    />

                    <RiDeleteBin5Line
                      size={16}
                      className="text-green-800 hover:text-green-500"
                      onClick={() => {
                        setShowDeleteModal(true)
                        setItem(employee)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white px-8 py-4 w-full rounded-sm flex justify-between items-center cursor-default">
              <div className="text-sm font-semibold">{`Showing ${
                indexOfFirstEmployee + 1
              } - ${indexOfFirstEmployee + currentEmployees.length} of ${
                employees.length
              } entries`}</div>

              <Pagination
                itemsPerPage={employeesPerPage}
                totalItems={employees.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Employees
