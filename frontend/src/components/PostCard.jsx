import React from 'react'
import '../styles/postCardStyle.css'

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <h3>{post?.author?.name}</h3>
            <pre>{post?.caption}</pre>
            {post?.tags?.length > 0 && <p>Tags: {post?.tags?.join(", ")}</p>}

            {post.mediaUrl && (
                <div className="preview">
                    {post.mediaType.startsWith("video") ? (
                        <video src={post.mediaUrl} controls className="preview-video" />
                    ) : (
                        <img src={post.mediaUrl} alt="preview" className="preview-image" />
                    )}
                </div>
            )}
        </div>
    )
}

export default PostCard