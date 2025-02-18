import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBooks } from "../redux/slices/bookSlice";
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import BookCard from "../components/BookCard";
import axios from "axios";

const BookPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/${id}`);
                setReviews(data);
            } catch (error) {
                setError("Error loading reviews.");
            }
        };
        fetchReviews();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        // Redirect to login if the user is not logged in
        if (!user) {
            navigate('/login');
            return;  // Stop function execution
        }

        // Ensure user._id exists before using it
        if (!user._id) {
            setError("Invalid user. Please log in again.");
            return;
        }

        const reviewData = { bookId: id, userId: user._id, rating, comment };

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/reviews`, reviewData);

            setRating(0);
            setComment("");
            setError("");

            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/reviews/${id}`);
            setReviews(data);
        } catch (error) {
            setError("Error submitting review.");
            console.error(error);
        }
    };


    const book = books.find((b) => b._id === id);

    return (
        <Container className="my-5">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Row className="mb-5">
                        <Col md={4}>
                            <BookCard book={book} />
                        </Col>
                        <Col md={8}>
                            {/* Title and Description Card */}
                            <Card className="border-0 mb-4">
                                <Card.Body>
                                    <h2 className="font-weight-bold">{book.title}</h2>
                                    <p className="text-muted">{book.description}</p>
                                </Card.Body>
                            </Card>

                            {/* Reviews Section */}
                            <div className="mb-5">
                                <h3 className="font-weight-bold">Reviews</h3>
                                {error && <p className="text-danger">{error}</p>}
                                {reviews.length === 0 ? (
                                    <p>No reviews yet.</p>
                                ) : (
                                    reviews.map((review) => (
                                        <Card key={review._id} className="shadow-sm my-3">
                                            <Card.Body>
                                                <h5 className="font-weight-bold">{review.user.name}</h5>
                                                <p>
                                                    <strong>Rating:</strong>{" "}
                                                    {Array(review.rating)
                                                        .fill("⭐")
                                                        .join("")}
                                                </p>
                                                <p>{review.comment}</p>
                                            </Card.Body>
                                        </Card>
                                    ))
                                )}
                            </div>

                            {/* Write a Review Section */}
                            <div>
                                <h4 className="font-weight-bold">Write a Review</h4>
                                <Form onSubmit={handleReviewSubmit}>
                                    <Form.Group controlId="formRating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={rating}
                                            onChange={(e) => setRating(Number(e.target.value))}
                                        >
                                            <option value="0">Select rating</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="formComment" className="mt-3">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="mt-3">
                                        Submit Review
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default BookPage;
