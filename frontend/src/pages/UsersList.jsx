import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from '../components/UserCard'
import '../styles/userList.css'

const UsersList = () => {
  const {users, loading, error} = useSelector((state) => state.user);

  return (
    <div className='container'>
      <h2>Users List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className='user-list'>
        {users.map((user) => (
          <li key={user._id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UsersList