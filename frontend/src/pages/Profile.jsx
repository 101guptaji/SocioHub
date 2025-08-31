import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProfile} from '../redux/slices/authSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const {user, loading, error} = useSelector((state) => state.auth)

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
      <h2>@{user?.username}</h2>
      <p>Name: {user?.name}</p>
      <p>Bio: {user?.bio}</p>
      <img src={user?.profilePicture || '/profile.png'} alt="avatar" style={{ width:120, height:120, borderRadius:8 }} />
    </div>
  )
}

export default Profile