import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {createPost } from '../redux/slices/postSlice'
import '../styles/createPostModal.css'

const CreatePostModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [caption, setCaption] = useState('');
    const media ={
        type: '',
        url: ''
    };

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            setUploading(true);
            // Upload the file if it exists
            if (file) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
                data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

                const cloudRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
                    {
                        method: "POST",
                        body: data,
                    }
                );

                const cloudData = await cloudRes.json();
                // console.log("Cloudinary upload response:", cloudData);

                media.url = cloudData.secure_url;
                media.type = cloudData.resource_type;
            }

            console.log(media);
            // Update user profile
            await dispatch(createPost({caption, mediaUrl: media.url, mediaType: media.type})).unwrap();

            toast.success("Post created successfully!");

            onClose();
            navigate('/feed');
        } catch (error) {
            onClose();
            console.error('Error creating post:', error);
            toast.error("Failed to create post.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="post-modal">
                <div className='modal-header'>
                    <h2 className='profile-title'>Create Post</h2>
                    <button className='close-btn' onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="post-input"
                        placeholder="What do you want to talk about?"
                    />

                    {preview && (
                        <div className="preview">
                            {file.type.startsWith("video") ? (
                                <video src={preview} controls className="preview-video" />
                            ) : (
                                <img src={preview} alt="preview" className="preview-image" />
                            )}
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button type='button' className='media-btn'>
                        <input type="file" name="file" accept="image/*,video/*" onChange={handleFileChange} style={{ display: 'none' }} />
                        <span onClick={() => document.querySelector('input[type="file"]').click()}>Add Media</span>
                    </button>
                    <button className="post-btn" onClick={handleSubmit} disabled={uploading}>
                        {uploading ? "Posting..." : "Post"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default CreatePostModal