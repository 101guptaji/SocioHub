import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProfile} from '../redux/slices/authSlice'
import ProfileCard from '../components/ProfileCard'
import FriendsList from '../components/FriendsList'
import { RequestsList } from '../components/RequestsList'
import '../styles/profileStyle.css'

const Profile = () => {
  const dispatch = useDispatch()
  const {user, loading, error} = useSelector((state) => state.auth)
  const {friends} = useSelector((state) => state.user)
  const navigate = useNavigate()

  const [showFriends, setShowFriends] = useState(true)

  const handleEditProfile = () => {
    navigate('/edit-profile')
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProfile())
    }
    fetchData()
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="container">
      <ProfileCard user={user} onEditProfile={handleEditProfile} />

      <div className="friends-btns">
        <button className={`toggle-btn ${showFriends ? 'active' : ''}`} onClick={()=>setShowFriends(true)}>Friends</button>
        <button className={`toggle-btn ${!showFriends ? 'active' : ''}`} onClick={()=>setShowFriends(false)}>Requests</button>
      </div>

      {
        showFriends ? <FriendsList friends={friends} /> : <RequestsList />
      }
    </div>
  )
}

export default Profile