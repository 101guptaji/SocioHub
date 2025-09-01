import mongoose from 'mongoose';

const convSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessageAt: Date
}, { timestamps: true });

convSchema.index({ participants: 1 });

export default mongoose.model('Conversation', convSchema);
