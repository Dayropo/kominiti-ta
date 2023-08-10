import * as yup from "yup"
import { useFormik } from "formik"
import { EmployeeContextType, IsEmployee } from "../../@types/employee"
import { EmployeeContext } from "../../context/EmployeeContext"
import { useContext } from "react"

type EditModalProps = {
  setShowEditModal: (val: boolean) => void
  item: IsEmployee
}

const validationSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("This field is required")
    .min(3, "Full name must be at least 3 characters"),
})

const EditModal = ({ setShowEditModal, item }: EditModalProps) => {
  const { updateEmployee } = useContext(EmployeeContext) as EmployeeContextType
  const formik = useFormik({
    initialValues: {
      fullname: item.fullname,
    },
    enableReinitialize: true,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      updateEmployee(item.user_id, values.fullname)
      resetForm()
      setShowEditModal(false)
    },
  })

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
              <h3 className="font-semibold">Edit</h3>
            </div>

            <hr />

            <form onSubmit={formik.handleSubmit}>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 relative">
                <div>
                  <label htmlFor="fullname">Enter Full name</label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="e.g Savannah Nguyen"
                    className="w-full bg-gray-50 mt-2 py-2 px-4 rounded-lg focus:outline-1 focus:outline-green-600"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  className="inline-flex w-full justify-center rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditModal
