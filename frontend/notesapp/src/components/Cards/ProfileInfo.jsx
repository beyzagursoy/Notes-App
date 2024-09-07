import PropTypes from 'prop-types';
import { getInitials } from "../../utils/helper";


const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    // Eğer userInfo null veya undefined ise, bileşeni render etmeyebiliriz veya bir yedek render yapabiliriz.
    return null; // veya return <div>Loading...</div>; 
  }
  return (
    <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 ">
            {getInitials(userInfo.fullName)}
        </div>

        <div>
            <p className="text-sm font-medium">{userInfo.fullName}</p>
            <button className="text-sm text-slate-700 underline" onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ProfileInfo;