import Post from './model.js';
import User from '../users/model.js';

export async function createPost(req, res, next) {
    try {
        const { caption, mediaUrl, mediaType, tags } = req.body;

        const p = await Post.create({
            author: req.user.id,
            caption,
            mediaUrl,
            mediaType,
            tags
        });
        res.status(201).json(p);
    } catch (e) { next(e); }
}

export async function getFeed(req, res, next) {
    try {
        const user = await User.findById(req.user.id).populate("friends", "_id");

        const friendIds = (user.friends || []).map((f) => f._id);

        const posts = await Post.find({ author: { $in: [...friendIds, req.user.id] } })
            .populate("author", "username name profilePicture")
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (e) { next(e); }
}

export async function getPostById(req, res, next) {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username name profilePicture')
            .populate('tags', 'username')
            .populate('likes', 'username name')
            .populate('comments.user', 'username name profilePicture');
        if (!post)
            return res.status(404).json({ message: 'Post not found' });

        res.json(post);
    } catch (e) { next(e); }
}
