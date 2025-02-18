import Book from "../models/Book.js";
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("reviews");
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single book
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("reviews");
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new book (Admin only)
export const addBook = async (req, res) => {
    try {
        const { title, author, genre, description, coverImage } = req.body;

        // Ensure the file exists
        if (!(title, author, genre, description, coverImage)) {
            return res.status(400).json({ message: 'No file uploaded' });
        }


        // Create a new book entry with the uploaded image URL
        const newBook = new Book({
            title,
            author,
            genre,
            description,
            coverImage: coverImage,
        });

        // Save the book to the database
        await newBook.save();

        // Send a response to the client
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ message: error.message });
    }
};
