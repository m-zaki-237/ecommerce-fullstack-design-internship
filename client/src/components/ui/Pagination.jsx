const Pagination = ({ currentPage, totalPages = 3, onPageChange }) => (
  <div className="flex items-center justify-between mt-6">
    <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400">
      <option>Show 10</option>
      <option>Show 20</option>
      <option>Show 50</option>
    </select>
    <div className="flex gap-1">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 transition-colors"
        disabled={currentPage === 1}
      >
        ‹
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-8 h-8 rounded border text-sm transition-colors ${
            p === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-50 transition-colors"
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    </div>
  </div>
);

export default Pagination;
