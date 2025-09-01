import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sendFriendRequest, rejectFriendRequest, acceptFriendRequest, unfriend } from '../redux/slices/friendsSlice'
import toast from 'react-hot-toast'

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const statuses = {
        "": "Send Request",
        "pending": user.requestId ? "Accept Request" : "Cancel Request",
        "accepted": "Unfriend"
    }

    const handleRequest = async () => {
        try {
            if (user?.status?.trim() === '' || statuses[user?.status?.trim()] === 'Send Request') {
                await dispatch(sendFriendRequest(user._id)).unwrap();
                toast.success("Friend request sent!");
            }
            else if (statuses[user?.status?.trim()] === 'Cancel Request') {
                await dispatch(rejectFriendRequest(user._id)).unwrap();
                toast.success("Friend request canceled!");
            }
            else if (statuses[user?.status?.trim()] === 'Accept Request') {
                await dispatch(acceptFriendRequest(user.requestId)).unwrap();
                toast.success("Friend request accepted!");
            }
            else if (statuses[user?.status?.trim()] === 'Unfriend') {
                await dispatch(unfriend(user._id)).unwrap();
                toast.success("Unfriended successfully!");
            }
            navigate('/profile');
        } catch (error) {
            console.error("Error in request:", error);
            toast.error(error.message);
        }
    }

    return (
        <div className='user-card'>
            <div className="profile-img">
                <img src={user?.profilePicture || '/profile.png'} alt="avatar" />
            </div>
            <div className="profile-info">
                <h2>{user?.name || 'Anonymous'}</h2>
                <h3>@{user?.username}</h3>
                <button className='btn' onClick={handleRequest}>{statuses[user?.status] || 'Send Request'}</button>

            </div>
        </div>
    )
}

export default UserCard