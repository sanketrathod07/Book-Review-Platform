import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/slices/bookSlice";
import BookCard from "../components/BookCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <div className="hero-section">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} className="text-center">
                            <h1 className="hero-title">Welcome to Book Haven</h1>
                            <p className="hero-subtitle">
                                Discover the best books, read reviews, and find your next favorite read.
                            </p>
                            <Button variant="primary" className="cta-button">
                                Explore Books
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Featured Books Section */}
            <Container className="my-5">
                <h2 className="section-title">Featured Books</h2>
                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : (
                    <Row>
                        {books?.map((book) => (
                            <Col key={book._id} md={4} className="mb-4">
                                <BookCard book={book} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default HomePage;
