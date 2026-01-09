import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Spinner, Alert, Card } from "react-bootstrap";
import { getLeaderboard } from "../features/user/userThunks";

export default function Leaderboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { leaderboard, loading, error } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        dispatch(getLeaderboard());
    }, [dispatch, token, navigate]);

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Leaderboard</h2>
                <Button variant="outline-secondary" onClick={() => navigate("/user")}>
                    Back to Home
                </Button>
            </div>

            {loading && (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            )}

            {error && (
                <Alert variant="danger">{error}</Alert>
            )}

            {!loading && !error && (
                <Card>
                    <Card.Body>
                        {leaderboard.length === 0 ? (
                            <p className="text-center mb-0">No scores available yet.</p>
                        ) : (
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Student Name</th>
                                        <th>Quiz</th>
                                        <th>Score</th>
                                        <th>Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.map((entry, index) => (
                                        <tr key={entry.id || entry._id || index}>
                                            <td>{index + 1}</td>
                                            <td>{entry.student_name || entry.username || entry.student || "N/A"}</td>
                                            <td>{entry.quiz_title || entry.quiz_name || entry.quiz || "N/A"}</td>
                                            <td>{entry.score || entry.total_score || 0}</td>
                                            <td>{entry.percentage || entry.score_percentage || 0}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}
