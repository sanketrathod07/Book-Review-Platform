import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/userSlice";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password };
        try {
            await dispatch(registerUser(userData));
            navigate("/login"); // Redirect to login after successful registration
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '92vh', background: '#f8f9fa' }}>
            <Card className="shadow-lg p-4 rounded" style={{ width: '400px', background: '#212529', color: 'white' }}>
                <h2 className="text-center mb-4">Register</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-dark text-white border-secondary"
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mt-3">
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

                    <Button type="submit" className="mt-4 w-100" style={{ background: "linear-gradient(45deg, #ff9800, #ff5722)", border: "none" }}>
                        Register
                    </Button>

                    <p className="mt-3 text-center">
                        Already have an account? <Link to="/login" className="text-warning">Login</Link>
                    </p>
                </Form>
            </Card>
        </Container>
    );
};

export default RegisterPage;
