import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            required: true,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    },
    { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
