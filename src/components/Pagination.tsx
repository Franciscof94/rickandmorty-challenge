import { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface Props {
  currentPage: number;
  totalPages: number;
  next: string;
  prev: string;
  listNumber?: number;
  handleSetNewData: (listNumber: number | undefined, pageNumber: number, searchValue: string) => void
}

const Pagination = ({ currentPage, totalPages, next, prev, handleSetNewData, listNumber }: Props) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const start = Math.max(1, currentPageNumber - delta);
    const end = Math.min(totalPages, currentPageNumber + delta);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };


  const handlePageChange = (pageNumber: number) => {
    handleSetNewData(listNumber, pageNumber, '')
    setCurrentPageNumber(pageNumber);
  };

  return (
    <div className='bg-gray-200'>
      <nav className="flex justify-center my-4 py-2">
        {currentPageNumber > 1 && (
          <div>
            <button
              id="prev"
              className="px-4 py-2 cursor-pointer text-gray-800 rounded-l hover:bg-gray-300"
              onClick={() => prev && handlePageChange(currentPageNumber - 1)}
            >
              <IoIosArrowBack size={25} />
            </button>
          </div>
        )}
        {getPageNumbers().map((page) => (
          <div key={page}>
            <button
              className={`px-4 ${currentPageNumber === page ? 'bg-blue-500 text-white py-2' : 'text-gray-800 py-2'} cursor-pointer hover:bg-blue-600 hover:text-white`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </div>
        ))}
        {currentPageNumber < totalPages && (
          <div>
            <button
              id="next"
              className="px-4 cursor-pointer py-2 text-gray-800 rounded-r hover:bg-gray-300"
              onClick={() => next && handlePageChange(currentPageNumber + 1)}
            >
              <IoIosArrowForward size={25} />
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
