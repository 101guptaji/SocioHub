import mongoose from 'mongoose';

const msgSchema = new mongoose.Schema({
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: String,
    media: [{ url: String, type: String }]
}, { timestamps: true });

msgSchema.index({ conversation: 1, createdAt: -1 });

export default mongoose.model('Message', msgSchema);
