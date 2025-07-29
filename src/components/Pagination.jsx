import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import "./Pagination.css";
const Pagination = () => {
  const { page, totalPages, handlePageChange } = useContext(AppContext);

  return (
    <div className='pagination'>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>

      <span> Page {page} of {totalPages} </span>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;