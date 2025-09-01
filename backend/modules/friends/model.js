import mongoose from 'mongoose';

const frSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'declined'], 
        default: 'pending' }
}, { timestamps: true });

frSchema.index({ from: 1, to: 1 }, { unique: true });

export default mongoose.model('FriendRequest', frSchema);