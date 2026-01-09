import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, ListGroup, Spinner, Alert } from "react-bootstrap";
import { fetchQuizzes } from "../features/user/userThunks";
import { logout } from "../features/auth/authSlice";

export default function UserHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quizzes, loading, error } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        dispatch(fetchQuizzes());
    }, [dispatch, token, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleAttemptQuiz = (quizId) => {
        navigate(`/quiz/${quizId}`);
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Available Quizzes</h2>
                <div>
                    <Button variant="outline-primary" className="me-2" onClick={() => navigate("/leaderboard")}>
                        Leaderboard
                    </Button>
                    <Button variant="outline-danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}

            {error && (
                <Alert variant="danger">{error}</Alert>
            )}

            {!loading && !error && quizzes.length === 0 && (
                <Card>
                    <Card.Body>
                        <p className="text-center mb-0">No quizzes available at the moment.</p>
                    </Card.Body>
                </Card>
            )}

            {!loading && quizzes.length > 0 && (
                <ListGroup>
                    {quizzes.map((quiz) => (
                        <ListGroup.Item key={quiz.id || quiz._id} className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{quiz.title}</h5>
                                {quiz.questions && (
                                    <small className="text-muted">
                                        {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
                                    </small>
                                )}
                            </div>
                            <Button 
                                variant="primary" 
                                onClick={() => handleAttemptQuiz(quiz.id || quiz._id)}
                            >
                                Attempt Quiz
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
}
