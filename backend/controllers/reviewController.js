import Review from "../models/Review.js";
import Book from "../models/Book.js";

// Add a review
export const addReview = async (req, res) => {
    try {
        const { bookId, userId, rating, comment } = req.body;

        // Validate that the rating is a number between 1 and 5 (or your desired range)
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Invalid rating value' });
        }

        // Create a new review
        const review = new Review({ book: bookId, user: userId, rating, comment });
        await review.save();

        // Find the book and populate its reviews
        const book = await Book.findById(bookId).populate('reviews');

        if (!Array.isArray(book.reviews)) {
            book.reviews = [];
        }

        // Add the new review to the book's reviews
        book.reviews.push(review._id);

        // Calculate the new average rating, ensuring we don't divide by zero
        let totalRating = 0;
        if (book.reviews.length > 0) {
            totalRating = book.reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0);
        }

        // Set the average rating only if there are reviews
        const averageRating = book.reviews.length > 0 ? totalRating / book.reviews.length : 0;

        // Ensure that the averageRating is a valid number before saving
        book.averageRating = !isNaN(averageRating) ? averageRating : 0;

        // Save the updated book
        await book.save();

        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        console.error(error);  // Log the error for better debugging
        res.status(500).json({ message: error.message });
    }
};



// Get reviews for a book
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ book: req.params.bookId }).populate("user", "name");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
