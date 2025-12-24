import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  // Simple pagination: show current, +/- 1, and first/last if far
  // For a real app, make this more robust
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length -1] !== '...') {
        if ((currentPage > 3 && i < currentPage -1) || (currentPage < totalPages -2 && i > currentPage + 1)) {
             pageNumbers.push('...');
        }
    }
  }
  // Remove consecutive '...'
  const uniquePageNumbers = pageNumbers.filter((item, index) => item !== '...' || pageNumbers[index-1] !== '...');


  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
        </li>
        {uniquePageNumbers.map((number, index) => (
          <li key={index} className={`page-item ${number === currentPage ? 'active' : ''} ${number === '...' ? 'disabled' : ''}`}>
            {number === '...' ? (
                 <span className="page-link">...</span>
            ) : (
                <button className="page-link" onClick={() => onPageChange(number)}>{number}</button>
            )}
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;