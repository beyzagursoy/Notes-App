import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { useSelector } from 'react-redux';
const App = () => {
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <div className={`${mode ? 'bg-black' : 'bg-white'} h-screen`}>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
