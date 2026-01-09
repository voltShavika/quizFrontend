import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import UserHome from "../pages/UserHome";
import AdminHome from "../pages/AdminHome";
import Leaderboard from "../pages/Leaderboard";
import AttemptQuiz from "../pages/AttemptQuiz";
import CreateQuiz from "../pages/CreateQuiz";
import { useSelector } from "react-redux";

export default function AppRoutes() {
    const { token, role } = useSelector((state) => state.auth);

    console.log("Local Token", token)
    return (
        <Routes>
            <Route path="/login" element={!token ? <Login/> : <Navigate to="/"/>} />
            <Route path="/signup" element={!token ? <Signup/> : <Navigate to="/"/>} />
            <Route path="/" element={token ? <Home/> : <Navigate to="/login" />}/>
            <Route path="/user" element={token && role !== "admin" ? <UserHome/> : <Navigate to="/login" />}/>
            <Route path="/admin" element={token && role === "admin" ? <AdminHome/> : <Navigate to="/login" />}/>
            <Route path="/admin/create-quiz" element={token && role === "admin" ? <CreateQuiz/> : <Navigate to="/login" />}/>
            <Route path="/leaderboard" element={token ? <Leaderboard/> : <Navigate to="/login" />}/>
            <Route path="/quiz/:quizId" element={token ? <AttemptQuiz/> : <Navigate to="/login" />}/>
        </Routes>
    )
}