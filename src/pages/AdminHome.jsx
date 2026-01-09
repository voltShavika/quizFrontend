import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

export default function AdminHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, role } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token || role !== "admin") {
            navigate("/login");
        }
    }, [token, role, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleCreateQuiz = () => {
        navigate("/admin/create-quiz");
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Admin Dashboard</h2>
                <Button variant="outline-danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            <Card>
                <Card.Body>
                    <h4 className="mb-4">Quiz Management</h4>
                    <Button variant="primary" size="lg" onClick={handleCreateQuiz}>
                        Create New Quiz
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
