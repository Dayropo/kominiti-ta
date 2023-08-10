type PaginationProps = {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  setCurrentPage: (val: number) => void
}

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers: number[] = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex gap-4">
      <button
        className={"text-sm disabled:text-gray-400"}
        disabled={currentPage === 1 ? true : false}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      <div className="flex gap-2">
        {pageNumbers.map((item, index) => (
          <div
            key={index}
            className={`${
              item === currentPage
                ? "bg-green-800 text-white rounded-full"
                : "bg-white text-green"
            }  w-6 h-6 flex justify-center items-center text-xs cursor-pointer`}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <button
        className="text-sm disabled:text-gray-400"
        disabled={
          currentPage === pageNumbers[pageNumbers.length - 1] ? true : false
        }
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
