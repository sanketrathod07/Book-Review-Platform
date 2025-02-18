import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/BookCard.css";

const BookCard = ({ book }) => {
    return (
        <Card className="book-card">
            <Card.Img variant="top" src={book.coverImage || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"} alt={book.title} className="book-card-img" />
            <Card.Body>
                <Card.Title className="book-card-title">{book.title}</Card.Title>
                <Card.Text className="book-card-author">{book.author}</Card.Text>
                <Link to={`/book/${book._id}`}>
                    <Button variant="primary" className="view-details-btn">
                        View Details
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default BookCard;
