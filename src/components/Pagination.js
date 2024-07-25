// src/components/Pagination.js
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item mx-1">
              <button
                onClick={() => paginate(number)}
                className={`page-link px-3 py-1 rounded-md ${
                  currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Pagination;
  