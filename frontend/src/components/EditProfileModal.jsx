import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../redux/slices/authSlice'
import '../styles/editProfileModal.css'

const EditProfileModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        profilePicture: user?.profilePicture || '',
        username: user?.username || '',
        name: user?.name || '',
        bio: user?.bio || '',
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            // Upload the file if it exists
            if (file) {
                setUploading(true);

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

                formData.profilePicture = cloudData.secure_url;
            }

            console.log(formData);
            // Update user profile
            await dispatch(updateProfile(formData)).unwrap();
            
            toast.success("Profile updated successfully!");
            
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error("Failed to update profile.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <div className="modal-overlay" onClick={() => navigate('/profile')}></div>
            <div className="modal">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className='profile-img'>
                        <img src={preview || formData.profilePicture} alt="Profile" />
                        <button type='button' className='btn'>
                            <input type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                            <span onClick={() => document.querySelector('input[type="file"]').click()}>Edit Image</span>
                        </button>

                    </div>
                    <div className='form-row'>
                        <label>Name</label>
                        <input type="text" name='name' value={formData.name} onChange={handleChange} />
                    </div>
                    <div className='form-row'>
                        <label>Bio</label>
                        <textarea name='bio' value={formData.bio} onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className='submit-btn'>{uploading ? "Uploading..." : "Save"}</button>
                    <button type="button" onClick={() => navigate('/profile')} className='cancel-btn'>Cancel</button>
                </form>
            </div>
        </>

    )
}

export default EditProfileModal