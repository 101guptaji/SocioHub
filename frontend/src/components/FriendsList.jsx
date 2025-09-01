import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchFriends } from '../redux/slices/userSlice'
import UserCard from './UserCard'

const FriendsList = () => {
  const dispatch = useDispatch()
  const { friends, loading, error } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFriends())
    }
    fetchData()
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='friends-list'>
        {loading? <div className='loading'>Loading...</div> : null}
        {error && <div className='error'>{error}</div>}
        {friends.length === 0 && <div className='no-items'>No friends found.</div>}
      {friends.map((friend) => (
        <UserCard key={friend._id} user={friend} style={{ width: '100%' }} />
      ))}
    </div>
  )
}

export default FriendsList