import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button onClick={() => onPageChange(i)} className="page-link">
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} className="page-link">
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} className="page-link">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;