import PropTypes from 'prop-types';
import { getInitials } from "../../utils/helper";
import { useSelector } from 'react-redux';

const ProfileInfo = ({ userInfo, onLogout, onToggleDarkMode }) => {
  if (!userInfo) {
    return null; 
  }

  const { mode } = useSelector((state) => state.darkMode);
  console.log(mode);

  return (
    <div className="flex items-center gap-3">
      <div className={`${mode ? 'text-slate-50 bg-slate-700' : 'text-slate-950 bg-slate-100'} w-12 h-12 flex items-center justify-center rounded-full font-medium`}>
        {getInitials(userInfo.fullName)}
      </div>

      <div className="flex flex-col">
        <p className={`${mode ? 'text-slate-50' : 'text-slate-950'} text-sm font-medium`}>{userInfo.fullName}</p>
        <div className="flex flex-col items-start">
          <button 
            className={`${mode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'} text-sm underline mt-1`}
            onClick={onLogout}
          >
            Logout
          </button>
          <button 
            className={`${mode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'} text-sm underline mt-1`}
            onClick={onToggleDarkMode}
          >
            {mode ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
};

export default ProfileInfo;
