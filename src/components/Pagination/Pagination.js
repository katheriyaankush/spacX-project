import React from 'react';
import './Pagination.css';

const Pagination = ({ dataPerPage, total, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
  
      <div className='pagination'>
        {pageNumbers.map(number => { 
          return (
          
            <a key={number}  onClick={() => paginate(number)} href='!#' >
              {number}
            </a>
            
        )})}
      </div>
  );
};

export default Pagination;
