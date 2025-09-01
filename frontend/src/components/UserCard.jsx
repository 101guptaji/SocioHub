import React from 'react'
import { useDispatch } from 'react-redux'
import {sendFriendRequest} from '../redux/slices/friendsSlice'
import toast from 'react-hot-toast'

const UserCard = ({ user }) => {
    const dispatch = useDispatch();

    const handleRequest = async () => {
        try {
            if(user?.status?.trim() === '' || user?.status?.trim() === 'Send Request') {
                await dispatch(sendFriendRequest(user._id)).unwrap();
                toast.success("Friend request sent!");
            }
        } catch (error) {
            console.error("Failed to send friend request:", error);
            toast.error("Failed to send friend request");
        }
    }

    console.log(user.status)

    return (
        <div className='user-card'>
            <div className="profile-img">
                <img src={user?.profilePicture || '/profile.png'} alt="avatar" />
            </div>
            <div className="profile-info">
                <h2>{user?.name || 'Anonymous'}</h2>
                <h3>@{user?.username}</h3>
                <button className='btn' onClick={handleRequest} disabled={user?.status === 'Pending' || user?.status === 'Friend'}>{user?.status || 'Send Request'}</button>


            </div>
        </div>
    )
}

export default UserCard