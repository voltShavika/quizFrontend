import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { createQuiz } from "../features/admin/adminThunks";
import { clearAlert } from "../features/admin/adminSlice";

export default function CreateQuiz() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.admin);
    const { token, role } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        questions: [
            {
                question_text: "",
                options: ["", "", "", ""],
                correct_answer: ""
            }
        ]
    });

    useEffect(() => {
        if (!token || role !== "admin") {
            navigate("/login");
        }
        return () => {
            dispatch(clearAlert());
        };
    }, [token, role, navigate, dispatch]);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate("/admin");
            }, 2000);
        }
    }, [success, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setFormData(prev => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const addQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    question_text: "",
                    options: ["", "", "", ""],
                    correct_answer: ""
                }
            ]
        }));
    };

    const removeQuestion = (index) => {
        if (formData.questions.length > 1) {
            const updatedQuestions = formData.questions.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                questions: updatedQuestions
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.title.trim()) {
            alert("Please enter a quiz title");
            return;
        }

        if (formData.questions.some(q => !q.question_text.trim())) {
            alert("Please fill in all questions");
            return;
        }

        if (formData.questions.some(q => !q.correct_answer.trim())) {
            alert("Please specify correct answer for all questions");
            return;
        }

        dispatch(createQuiz(formData));
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Create New Quiz</h2>
                <Button variant="outline-secondary" onClick={() => navigate("/admin")}>
                    Back to Dashboard
                </Button>
            </div>

            {error && (
                <Alert variant="danger" dismissible onClose={() => dispatch(clearAlert())}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert variant="success">
                    {success}
                </Alert>
            )}

            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Quiz Title *</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Duration (minutes)</Form.Label>
                            <Form.Control
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                min="1"
                            />
                        </Form.Group>

                        <hr />

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4>Questions</h4>
                            <Button type="button" variant="outline-primary" onClick={addQuestion}>
                                Add Question
                            </Button>
                        </div>

                        {formData.questions.map((question, qIndex) => (
                            <Card key={qIndex} className="mb-3">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5>Question {qIndex + 1}</h5>
                                        {formData.questions.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => removeQuestion(qIndex)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Question Text *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={question.question_text}
                                            onChange={(e) => handleQuestionChange(qIndex, "question_text", e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Label>Options *</Form.Label>
                                    {question.options.map((option, optIndex) => (
                                        <Form.Group key={optIndex} className="mb-2">
                                            <Form.Control
                                                type="text"
                                                placeholder={`Option ${optIndex + 1}`}
                                                value={option}
                                                onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                                            />
                                        </Form.Group>
                                    ))}

                                    <Form.Group className="mb-3">
                                        <Form.Label>Correct Answer *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={question.correct_answer}
                                            onChange={(e) => handleQuestionChange(qIndex, "correct_answer", e.target.value)}
                                            placeholder="Enter the correct answer"
                                            required
                                        />
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        ))}

                        <div className="text-center mt-4">
                            {loading ? (
                                <Spinner animation="border" />
                            ) : (
                                <Button type="submit" variant="primary" size="lg">
                                    Create Quiz
                                </Button>
                            )}
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
