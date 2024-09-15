import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const SearchBar = ({ searchState, handleChange, handleSearch, clearSearch }) => {
  const { searchQuery } = searchState;
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <div className={`w-80 flex items-center px-4 rounded-md border ${mode ? 'bg-black border-white' : 'bg-white border-black'}`}>
      <input
        type="text"
        name="searchQuery"
        placeholder="Search Notes"
        value={searchQuery}
        onChange={(e) => handleChange(e)}
        className={`w-full text-xs py-[11px] outline-none ${mode ? 'bg-black text-white' : 'bg-white text-black'}`}
      />

      {searchQuery && (
        <IoMdClose 
          className={`cursor-pointer mr-3 ${mode ? 'text-white hover:text-black' : 'text-black hover:text-white'}`} 
          onClick={clearSearch} 
        />
      )}

      <FaMagnifyingGlass 
        className={`cursor-pointer ${mode ? 'text-white hover:text-black' : 'text-black hover:text-white'}`} 
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
