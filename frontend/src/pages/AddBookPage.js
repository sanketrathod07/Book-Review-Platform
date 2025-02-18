import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import '../styles/AddBookPage.css'

const AddBookPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append("file", coverImage);
        formData.append("upload_preset", "foodwaste");
        formData.append("cloud_name", "dq8b6vgab");

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dq8b6vgab/image/upload", formData);
            return response.data.secure_url;
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("Image upload failed!");
            return null;
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        setLoading(true); // Disable button and show loading

        const imageUrl = await handleImageUpload();
        if (!imageUrl) {
            setLoading(false);
            return;
        }

        const newBook = { title, author, genre, description, coverImage: imageUrl };

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/books`, newBook);
            alert("Book added successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Error adding book!");
        } finally {
            setLoading(false); // Enable button after request is complete
        }
    };

    return (
        <div className="add-book-page">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="profile-card shadow-lg rounded">
                            <Card.Body>
                                <div className="text-center mb-4">
                                    <FaBook size={80} color="#007bff" />
                                    <h2 className="mt-3">Add a New Book</h2>
                                </div>
                                <Form onSubmit={handleAddBook}>
                                    {/* Title */}
                                    <Form.Group controlId="formTitle" className="mb-4">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter book title"
                                            required
                                            className="custom-input"
                                        />
                                    </Form.Group>

                                    {/* Author */}
                                    <Form.Group controlId="formAuthor" className="mb-4">
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            placeholder="Enter book author"
                                            required
                                            className="custom-input"
                                        />
                                    </Form.Group>

                                    {/* Genre */}
                                    <Form.Group controlId="formGenre" className="mb-4">
                                        <Form.Label>Genre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={genre}
                                            onChange={(e) => setGenre(e.target.value)}
                                            placeholder="Enter book genre"
                                            required
                                            className="custom-input"
                                        />
                                    </Form.Group>

                                    {/* Description */}
                                    <Form.Group controlId="formDescription" className="mb-4">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter book description"
                                            required
                                            className="custom-input"
                                        />
                                    </Form.Group>

                                    {/* Cover Image */}
                                    <Form.Group controlId="formCoverImage" className="mb-4">
                                        <Form.Label>Cover Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setCoverImage(e.target.files[0])}
                                            required
                                            className="custom-input"
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100 custom-btn" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Adding...
                                            </>
                                        ) : (
                                            "Add Book"
                                        )}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddBookPage;
