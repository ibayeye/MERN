import React from "react";

const NewPagination = ({ currentPage, totalPage, handlePageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  return (
    <div className="join">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`join-item btn btn-xs ${
            page === currentPage ? "btn-active" : ""
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default NewPagination;
