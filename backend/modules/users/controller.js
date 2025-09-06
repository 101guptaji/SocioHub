import User from "./model.js";
import Friends from '../friends/model.js';

export async function getMyProfile(req, res, next) {
    try {
        const user = await User.findById(req.user.id)
            .select('-password');
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        next(err); // 500
    }
}

export async function updateProfile(req, res, next) {
    try {
        const { name, bio, profilePicture } = req.body;
        console.log(name, bio, profilePicture);
        
        const update = {};
        if (name) update.name = name;
        if (bio) update.bio = bio;
        if (profilePicture) update.profilePicture = profilePicture;

        const user = await User.findByIdAndUpdate(req.user.id, update, { new: true })
            .select('-password');
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        next(err); // 500
    }
}

export async function searchUsers(req, res, next) {
    // console.log("Searching for:", req.query);
    try {
        
        const q = req.query.q || '';
        if (!q.trim()) 
            return res.json([]);
        
        const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        const users = await User.find({
            $or: [
                { name: { $regex: regex } },
                { username: { $regex: regex } },
                { email: { $regex: regex } }
            ]
        }).limit(20).select('name username profilePicture');

        // get friend status
        const myFriends = await Friends.find({
            $or: [
                { from: req.user.id },
                { to: req.user.id }
            ]
        })

        const friendsStatus = {};
        myFriends.forEach(fr => {
            const friendId = fr.from.equals(req.user.id) ? fr.to : fr.from;
            friendsStatus[friendId] = fr.status;
        });

        const updatedUsers = users.map(user => ({
            ...user.toObject(),
            status: friendsStatus[user._id] || ''
        }));

        // console.log(updatedUsers)
        res.json(updatedUsers);
    }
    catch (err) {
        next(err); // 500
    }
}

export async function getUserByUsername(req, res, next) {
    try {
        const user = await User.findOne({ username: req.params.username })
            .select('-password');

        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        next(err); // 500
    }
}

export async function getFriends(req, res, next) {
    try {
        const friends = await Friends.find({
            $or: [
                { from: req.user.id },
                { to: req.user.id }
            ],
            status: 'accepted'
        }).populate('from to', 'name username profilePicture');

        const onlyFriends = friends.map((fr) =>({
            _id: fr.from._id.equals(req.user.id) ? fr.to._id : fr.from._id,
            name: fr.from._id.equals(req.user.id) ? fr.to.name : fr.from.name,
            username: fr.from._id.equals(req.user.id) ? fr.to.username : fr.from.username,
            profilePicture: fr.from._id.equals(req.user.id) ? fr.to.profilePicture : fr.from.profilePicture,
            status: fr.status,
            requestId: fr._id
        }))

        res.json(onlyFriends);
    }
    catch (err) {
        next(err); // 500
    }
}