import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { useSelector } from "react-redux";

export default function AppRoutes() {
    const { token } = useSelector((state) => state.auth);

    return (
        <Routes>
            <Route path="/login" element={!token ? <Login/> : <Navigate to="/"/>} />
            <Route path="/signup" element={!token ? <Signup/> : <Navigate to="/"/>} />
            <Route path="/" element={token ? <p>Home</p> : <Navigate to="/login" />}/>
        </Routes>
    )
}