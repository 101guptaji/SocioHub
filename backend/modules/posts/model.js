import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: { type: String, trim: true },
    mediaUrl: { type: String }, // Cloudinary URL
    mediaType: { type: String, enum: [null, "image", "video"], default: null },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
}, { timestamps: true });

postSchema.index({ author: 1, createdAt: -1 });

export default mongoose.model('Post', postSchema);
