import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../redux/slices/userSlice";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import '../styles/UserProfilePage.css'

const UserProfilePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (!user && id) {
            dispatch(fetchUserProfile(id));
        } else if (user) {
            setName(user.name);
            setEmail(user.email);
            setProfileImage(user.profileImage);
        }
    }, [dispatch, id, user]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); // Temporary URL for preview
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { name, email, profileImage };
        dispatch(updateUserProfile({ updatedUser, id }));
    };

    return (
        <div className="user-profile-page">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="profile-card shadow-lg rounded">
                            <Card.Body>
                                <div className="profile-header text-center mb-4">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="profile-image"
                                        />
                                    ) : (
                                        <FaUserCircle size={100} color="#6c757d" />
                                    )}
                                    <h2 className="mt-3">{name || "User Name"}</h2>
                                </div>

                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <Form onSubmit={handleSubmit}>
                                        {/* Name */}
                                        <Form.Group controlId="formName" className="mb-4">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="custom-input"
                                            />
                                        </Form.Group>

                                        {/* Email */}
                                        <Form.Group controlId="formEmail" className="mb-4">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="custom-input"
                                            />
                                        </Form.Group>

                                        {/* Profile Image Upload */}
                                        <Form.Group controlId="formProfileImage" className="mb-4">
                                            <Form.Label>Profile Image</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="custom-input"
                                            />
                                        </Form.Group>

                                        {/* Update Button */}
                                        <Button variant="primary" type="submit" className="w-100 custom-btn">
                                            Update Profile
                                        </Button>
                                    </Form>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserProfilePage;
