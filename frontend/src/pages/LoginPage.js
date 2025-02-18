import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password };
        try {
            await dispatch(loginUser(credentials));
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '92vh', background: '#f8f9fa' }}>
            <Card className="shadow-lg p-4 rounded" style={{ width: '400px', background: '#212529', color: 'white' }}>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-dark text-white border-secondary"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-dark text-white border-secondary"
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between mt-2">
                        <Link to="/forgot-password" className="text-warning small">Forgot Password?</Link>
                    </div>

                    <Button type="submit" className="mt-4 w-100" style={{ background: "linear-gradient(45deg, #ff9800, #ff5722)", border: "none" }}>
                        Login
                    </Button>

                    <p className="mt-3 text-center">
                        Don't have an account? <Link to="/register" className="text-warning">Sign Up</Link>
                    </p>
                </Form>
            </Card>
        </Container>
    );
};

export default LoginPage;
