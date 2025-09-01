import FriendRequest from './model.js';
import User from '../users/model.js';

export async function sendRequest(req, res) {
    try {
        const from = req.user.id;
        const { toUserId } = req.body;
        if (!toUserId) 
            return res.status(400).json({ message: 'toUserId required' });
        if (toUserId === from) 
            return res.status(400).json({ message: 'Cannot friend yourself' });

        // create (or error if exists because model has unique)
        const fr = await FriendRequest.create({ from, to: toUserId });
        res.status(201).json(fr);
    } catch (err) {
        if (err.code === 11000) 
            return res.status(409).json({ message: 'Request already exists' });
        next(err); // 500
    }
}

export async function listRequests(req, res) {
    try {
        const incoming = await FriendRequest.find({ to: req.user.id, status: 'pending' }).populate('from', 'username name profilePicture');
        const outgoing = await FriendRequest.find({ from: req.user.id, status: 'pending' }).populate('to', 'username name profilePicture');
        res.json({ incoming, outgoing });
    } catch (err) {
        next(err); // 500
    }
}

export async function acceptRequest(req, res) {
    try {
        const id = req.params.id;
        const fr = await FriendRequest.findById(id);
        if (!fr || fr.to.toString() !== req.user.id) 
            return res.status(404).json({ message: 'Request not found' });

        fr.status = 'accepted';
        await fr.save();

        // add to friends lists (avoid duplicates)
        await User.findByIdAndUpdate(fr.from, { $addToSet: { friends: fr.to } });
        await User.findByIdAndUpdate(fr.to, { $addToSet: { friends: fr.from } });

        res.status(200).json({ message: 'Accepted' });
    } catch (err) {
        next(err); // 500
    }
}

export async function rejectRequest(req, res) {
    try {
        const id = req.params.id;
        const fr = await FriendRequest.findById(id);
        if (!fr || fr.to.toString() !== req.user.id) 
            return res.status(404).json({ message: 'Request not found' });

        fr.status = 'rejected';
        await fr.save();

        res.status(200).json({ message: 'Rejected' });
    } catch (err) {
        next(err); // 500
    }
}

export async function unfriend(req, res) {
    try {
        const other = req.params.userId;
        await FriendRequest.deleteMany({
            $or: [
                { from: req.user.id, to: other },
                { from: other, to: req.user.id }
            ]
        });

        await User.findByIdAndUpdate(req.user.id, { $pull: { friends: other } });
        await User.findByIdAndUpdate(other, { $pull: { friends: req.user.id } });
        res.status(200).json({ message: 'Unfriended' });
    } catch (err) {
        next(err); // 500
    }
}
