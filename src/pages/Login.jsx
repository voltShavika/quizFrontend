import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import { Container, Card, Button, Form} from "react-bootstrap"
import { Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({username: "", password: ""});
    const dispatch = useDispatch();
    const { loading, error, success} = useSelector((s) => s.auth);

    return (
        <Container className="mt-5" style={{maxWidth: 400}}>
            <h3 className="text-center mb-3">Quiz System</h3>

            <Card body>
                { loading && <p>Loading...</p>}
                { error && <p>{error}</p>}
                { success && <p>{success}</p>}

                <Form>
                    <Form.Control
                        placeholder="Username"
                        className="mb-2"
                        onChange={(e) => setForm({...form, username: e.target.value})}
                    />
                    <Form.Control
                        type="password"
                        placeholder="password"
                        className="mb-2"
                        onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                    <Button
                        className="w-100"
                        onClick={() => dispatch(loginUser(form))}
                    >
                        Login
                    </Button>
                </Form>
                <div className="text-center mt-2">
                    <Link to="/signup">Register new user here</Link>
                </div>
            </Card>
        </Container>
    )
}