import User from "./model.js";

export async function getMyProfile(req, res) {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('friends', 'name username profilePicture');
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function updateProfile(req, res) {
    try {
        const { name, bio, profilePicture } = req.body;
        
        const updated = {};
        if (name) updated.name = name;
        if (bio) updated.bio = bio;
        if (profilePicture) updated.profilePicture = profilePicture;

        const user = await User.findByIdAndUpdate(req.user.id, updated, { new: true })
            .select('-password')
            .populate('friends', 'name username profilePicture');
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function searchUsers(req, res) {
    console.log("Searching for:", req.query);
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

        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getUserByUsername(req, res) {
    try {
        const user = await User.findOne({ username: req.params.username })
            .select('name username profilePicture bio');

        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}