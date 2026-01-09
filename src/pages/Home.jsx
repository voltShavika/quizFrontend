import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

export default function Home() {
    const { role } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (role === "admin") {
            navigate("/admin");
        } else {
            navigate("/user");
        }
    }, [role, navigate]);

    return (
        <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <Card body className="text-center">
                <p>Redirecting...</p>
            </Card>
        </Container>
    );
}
