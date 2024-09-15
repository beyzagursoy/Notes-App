import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import PropTypes from 'prop-types';

const SearchBar = ({ searchState, handleChange, handleSearch, clearSearch }) => {
  const { searchQuery } = searchState;

  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        name="searchQuery"
        placeholder="Search Notes"
        value={searchQuery}
        onChange={(e) => handleChange(e)}
        className="w-full text-xs bg-transparent py-[11px] outline-none"
      />

      {searchQuery && (
        <IoMdClose 
          className="text-slate-400 cursor-pointer hover:text-black mr-3" 
          onClick={clearSearch} 
        />
      )}

      <FaMagnifyingGlass 
        className="text-slate-400 cursor-pointer hover:text-black" 
        onClick={handleSearch}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchState: PropTypes.shape({
    searchQuery: PropTypes.string.isRequired
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

export default SearchBar;
