import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

interface SearchBarProps {
  onSearch: (searchValue: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue || '');
  };

  const handleDeleteString = () => {
    setSearchValue('')
    onSearch('');
  }

  return (
    <div className='border-2 border-black flex rounded-sm'>
      <div className="flex relative">
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder="Search characters..."
          className='py-1 px-2 w-60 sm:w-fll outline-0'
        />
        {searchValue && <div onClick={handleDeleteString} className="cursor-pointer absolute right-0">
          <IoIosClose size={29} />
        </div>}
      </div>
      <div className='bg-green-50 flex items-center px-2'>
        <button onClick={handleSearch} className=''><IoSearch size={23} /></button>
      </div>
    </div>
  );
};
