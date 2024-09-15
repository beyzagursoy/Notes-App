import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from './../../utils/axiosInstance';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        //Login API Call
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7">Login</h4>

                        {/* Email input */}
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="input-box"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {/* Password input */}
                        <PasswordInput
                            name="password"
                            value={formData.password}
                            onChange={handleChange} 
                        />

                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                        <button type="submit" className="btn-primary">
                            Login
                        </button>

                        <p className="text-sm text-center mt-4">
                            Not registered yet?{" "}
                            <Link to="/signup" className="font-medium text-orange-600 underline">
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
