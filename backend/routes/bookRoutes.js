import express from "express";
import { getBooks, getBookById, addBook } from "../controllers/bookController.js";
import { upload } from "../config/multerConfig.js"; // Ensure this import is correct

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", upload.single('coverImage'), addBook); // Add multer's upload middleware here

export default router;
