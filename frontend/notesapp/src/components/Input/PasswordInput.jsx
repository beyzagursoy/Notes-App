import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import PropTypes from 'prop-types';

const PasswordInput = ({ value, onchange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onchange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-r rouned outline-none"
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-orange-600 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
};

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onchange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default PasswordInput;
