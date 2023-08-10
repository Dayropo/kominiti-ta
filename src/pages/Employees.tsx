import { DragEvent, useContext, useRef, useState } from "react"
import Header from "../components/ui/Header"
import { FiSearch, FiX } from "react-icons/fi"
import { EmployeeContext } from "../context/EmployeeContext"
import { EmployeeContextType, IsEmployee } from "../@types/employee"
import { PiDotsSixVerticalBold } from "react-icons/pi"
import { RiEditLine, RiDeleteBin5Line } from "react-icons/ri"
import Pagination from "../components/ui/Pagination"
import EditModal from "../components/ui/EditModal"
import DeleteModal from "../components/ui/DeleteModal"
import toast from "react-hot-toast"
import { FaRegCheckCircle } from "react-icons/fa"

const Employees = () => {
  const { employees, setEmployees, isLoading } = useContext(
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
    localStorage.setItem("employees", JSON.stringify(_employees))

    toast.custom(t => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto relative flex gap-4 items-center py-4 px-6 ring-1 ring-black ring-opacity-5`}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center p-2 bg-green-50">
          <FaRegCheckCircle size={20} className="text-green-800" />
        </div>

        <p className="text-sm text-gray-700">
          The items have been successfully rearranged. You can now breathe a
          sigh of relief as the task is complete.
        </p>

        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
          className="absolute top-0.5 right-0.5 bg-gray-50 w-6 h-6 p-1.5 rounded-full flex items-center justify-center"
        >
          <FiX size={20} />
        </button>
      </div>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {showEditModal && (
        <EditModal setShowEditModal={setShowEditModal} item={item} />
      )}

      {showDeleteModal && (
        <DeleteModal setShowDeleteModal={setShowDeleteModal} item={item} />
      )}

      <Header />

      <div className="sm:px-8 px-4 py-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold sm:text-base text-sm">Employees</p>

          <div className="relative sm:w-64 w-40">
            <input
              type="search"
              name=""
              id=""
              className="rounded-full w-full py-2 pl-10 pr-4 text-sm focus:outline-1 focus:outline-green-300"
            />
            <FiSearch
              className="text-green-600 absolute left-2.5 top-2 cursor-pointer"
              size={20}
            />
          </div>
        </div>

        {/* employees list */}
        {!isLoading && (
          <>
            {employees.length > 0 && (
              <div className="mt-6 space-y-6">
                <div className="bg-white px-8 py-4 w-full rounded-sm flex sm:flex-nowrap flex-wrap items-center sm:gap-8 gap-2.5 cursor-default">
                  <div className="sm:w-1/5 sm:block hidden text-sm"></div>
                  <div className="sm:w-1/5 w-1/4 font-semibold text-sm ">
                    id
                  </div>
                  <div className="sm:w-1/2 w-2/5 font-semibold text-sm">
                    Full name
                  </div>
                  <div className="sm:w-[10%] w-1/4 font-semibold text-sm">
                    Action
                  </div>
                </div>

                <div className="space-y-3">
                  {currentEmployees.map((employee: IsEmployee) => (
                    <div
                      className="bg-white px-8 py-4 w-full rounded-sm flex sm:flex-nowrap flex-wrap items-center sm:gap-8 gap-2.5 cursor-pointer"
                      key={employee.user_id}
                      draggable
                      onDragStart={() => handleDragStart(employee)}
                      onDragEnter={() => handleDragEnter(employee)}
                      onDragEnd={handleSort}
                      onDragOver={handleDragOver}
                    >
                      <div className="sm:w-1/5 sm:block hidden text-sm">
                        <PiDotsSixVerticalBold size={20} />
                      </div>
                      <div className="sm:w-1/5 w-1/4 text-sm ">
                        {employee.user_id}
                      </div>
                      <div className="sm:w-1/2 w-2/5 text-sm">
                        {employee.fullname}
                      </div>
                      <div className="sm:w-[10%] w-1/4 text-sm flex sm:gap-8 gap-2.5">
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

                <div className="bg-white px-8 py-4 w-full rounded-sm flex sm:justify-between justify-center items-center cursor-default">
                  <div className="text-sm font-semibold sm:block hidden">{`Showing ${
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
          </>
        )}
      </div>
    </div>
  )
}

export default Employees
