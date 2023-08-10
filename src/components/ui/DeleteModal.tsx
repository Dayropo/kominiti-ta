import { RiDeleteBin5Line } from "react-icons/ri"
import { EmployeeContextType, IsEmployee } from "../../@types/employee"
import { EmployeeContext } from "../../context/EmployeeContext"
import { useContext } from "react"
import toast from "react-hot-toast"
import { FaRegCheckCircle } from "react-icons/fa"

type DeleteModalProps = {
  setShowDeleteModal: (val: boolean) => void
  item?: IsEmployee
}

const DeleteModal = ({ setShowDeleteModal, item }: DeleteModalProps) => {
  const { deleteEmployee } = useContext(EmployeeContext) as EmployeeContextType

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="py-2.5 px-6">
              <div className="bg-green-50 p-2 flex items-center justify-center rounded-full w-8 h-8">
                <RiDeleteBin5Line size={16} className="text-green-800" />
              </div>
            </div>

            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 relative">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  Delete User
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this user&apos;s details?
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                onClick={() => {
                  if (item) {
                    deleteEmployee(item?.user_id)
                    setShowDeleteModal(false)
                    toast.custom(t => (
                      <div
                        className={`${
                          t.visible ? "animate-enter" : "animate-leave"
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col items-center py-6 px-8 ring-1 ring-black ring-opacity-5`}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center p-2 bg-green-50">
                          <FaRegCheckCircle
                            size={20}
                            className="text-green-800"
                          />
                        </div>

                        <h3 className="mt-4 font-semibold">Success!</h3>

                        <p className="text-sm text-gray-700 text-center">
                          The user has been successfully deleted. You can now
                          breathe a sigh of relief as the task is complete.
                        </p>

                        <button
                          type="button"
                          onClick={() => toast.dismiss(t.id)}
                          className="inline-flex w-full justify-center rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 mt-4"
                        >
                          Ok, thanks
                        </button>
                      </div>
                    ))
                  }
                }}
              >
                Yes, Delete
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
