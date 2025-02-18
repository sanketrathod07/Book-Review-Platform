import express from "express";
import { addReview, getReviews } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", addReview);
router.get("/:bookId", getReviews);

export default router;
