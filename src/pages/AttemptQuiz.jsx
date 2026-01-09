import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import { fetchQuizById, submitQuiz } from "../features/user/userThunks";
import { clearCurrentQuiz } from "../features/user/userSlice";

export default function AttemptQuiz() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { quizId } = useParams();
    const { currentQuiz, quizResult, loading, error } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.auth);
    
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        dispatch(fetchQuizById(quizId));
        
        return () => {
            dispatch(clearCurrentQuiz());
        };
    }, [dispatch, quizId, token, navigate]);

    // Initialize answers array when quiz loads
    useEffect(() => {
        if (currentQuiz && currentQuiz.questions) {
            setAnswers(new Array(currentQuiz.questions.length).fill(""));
        }
    }, [currentQuiz]);

    const handleAnswerChange = (questionIndex, answer) => {
        setAnswers(prev => {
            // Ensure array is long enough
            const newAnswers = [...prev];
            // If array is shorter than needed, extend it
            while (newAnswers.length <= questionIndex) {
                newAnswers.push("");
            }
            newAnswers[questionIndex] = answer;
            return newAnswers;
        });
    };

    const handleSubmit = () => {
        const questions = currentQuiz.questions || [];
        
        // Ensure answers array matches questions length (fill empty with "")
        const finalAnswers = questions.map((_, index) => {
            const answer = answers[index];
            return answer && answer.trim() ? answer.trim() : "";
        });
        
        // Check if at least one question is answered
        const validAnswers = finalAnswers.filter(ans => ans && ans.trim());
        if (validAnswers.length === 0) {
            alert("Please answer at least one question");
            return;
        }
        
        console.log("Submitting quiz:", {
            quiz_id: quizId,
            answers: finalAnswers,
            questions: questions.map(q => ({ question: q.question, correct_answer: q.correct_answer }))
        });
        
        dispatch(submitQuiz({ quiz_id: quizId, answers: finalAnswers }));
        setSubmitted(true);
    };

    const handleBack = () => {
        dispatch(clearCurrentQuiz());
        navigate("/user");
    };

    if (loading && !currentQuiz) {
        return (
            <Container className="mt-5 d-flex justify-content-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error && !currentQuiz) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
                <Button onClick={handleBack}>Back to Home</Button>
            </Container>
        );
    }

    if (submitted && quizResult) {
        return (
            <Container className="mt-4">
                <Card>
                    <Card.Body>
                        <h3 className="text-center mb-4">Quiz Results</h3>
                        <Alert variant={quizResult.score_percentage >= 70 ? "success" : "warning"}>
                            <h4>Your Score: {quizResult.score || quizResult.total_score || 0}</h4>
                            <p>Percentage: {quizResult.score_percentage || quizResult.percentage || 0}%</p>
                            {quizResult.total_questions && (
                                <p>Total Questions: {quizResult.total_questions}</p>
                            )}
                        </Alert>
                        <div className="text-center">
                            <Button variant="primary" onClick={handleBack}>
                                Back to Home
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    if (!currentQuiz) {
        return null;
    }

    const questions = currentQuiz.questions || [];

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{currentQuiz.title || "Quiz"}</h2>
                <Button variant="outline-secondary" onClick={handleBack}>
                    Back
                </Button>
            </div>

            {error && (
                <Alert variant="danger">{error}</Alert>
            )}

            <Card>
                <Card.Body>
                    <Form>
                        {questions.map((question, index) => {
                            return (
                                <div key={index} className="mb-4">
                                    <h5>Question {index + 1}: {question.question}</h5>
                                    {question.type === "multiple_choice" && question.options && question.options.length > 0 ? (
                                        <div>
                                            {question.options.map((option, optIndex) => {
                                                const optValue = typeof option === 'string' ? option : option.value || option.text;
                                                return (
                                                    <Form.Check
                                                        key={optIndex}
                                                        type="radio"
                                                        id={`q${index}-opt${optIndex}`}
                                                        name={`question-${index}`}
                                                        label={optValue}
                                                        value={optValue}
                                                        checked={answers[index] === optValue}
                                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                        className="mb-2"
                                                    />
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your answer"
                                            value={answers[index] || ""}
                                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </Form>

                    <div className="text-center mt-4">
                        {loading ? (
                            <Spinner animation="border" />
                        ) : (
                            <Button 
                                variant="primary" 
                                size="lg" 
                                onClick={handleSubmit}
                                disabled={answers.filter(ans => ans && ans.trim()).length === 0}
                            >
                                Submit Quiz
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
