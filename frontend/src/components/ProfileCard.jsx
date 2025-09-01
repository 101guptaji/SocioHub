import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom'

const ProfileCard = ({ user,onEditProfile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className='profile-card'>
            <div className="profile-img">
                <img src={user?.profilePicture || '/profile.png'} alt="avatar" />
            </div>
            <div className="profile-info">
                <div className="actions">
                    <h2>@{user?.username}</h2>
                    <button className='btn' onClick={onEditProfile}>Edit Profile</button>
                    <button className='btn' onClick={handleLogout}>Logout</button>
                </div>
                <h3>{user?.name || 'Anonymous'}</h3>
                <p>{user?.bio || 'No bio available'}</p>
            </div>
        </div>
    )
}

export default ProfileCard  