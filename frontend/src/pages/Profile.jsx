import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProfile} from '../redux/slices/authSlice'
import ProfileCard from '../components/ProfileCard'
import '../styles/profileStyle.css'

const Profile = () => {
  const dispatch = useDispatch()
  const {user, loading, error} = useSelector((state) => state.auth)
  const navigate = useNavigate()

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
    </div>
  )
}

export default Profile