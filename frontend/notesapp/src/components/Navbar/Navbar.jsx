import SearchBar from '../SearchBar/SearchBar';
import ProfileInfo from './../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [formState, setFormState] = useState({
    searchQuery: ""
  });

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = () => {
    if (formState.searchQuery) {
      onSearchNote(formState.searchQuery);
    }
  };

  const onClearSearch = () => {
    setFormState({ searchQuery: "" });
    handleClearSearch();
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notes App</h2>

        <SearchBar 
          searchState={formState}
          handleChange={handleChange}
          handleSearch={handleSearch}
          clearSearch={onClearSearch}
        />
        
        <ProfileInfo userInfo={userInfo} onLogout={() => {
          localStorage.clear();
          navigate("/login");
        }} /> 
    </div>
  );
};

Navbar.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onSearchNote: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
};

export default Navbar;
