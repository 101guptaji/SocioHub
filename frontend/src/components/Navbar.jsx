import '../styles/navbar.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { searchUsers } from '../redux/slices/userSlice'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [searchUser, setSearchUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      await dispatch(searchUsers(searchUser)).unwrap();
      navigate('/users');

    } catch (error) {
      toast.error(error.message || 'Search failed');
    }
  }

  if(!localStorage.getItem("token")){
    return null;
  }

  return (
    <nav className='navbar'>
      <h1 className='logo'><a href="/feed">SocioHub</a></h1>
      <div className="search-bar">
        <input type="text" placeholder="Search..." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
        <button type="button" onClick={handleSearch}>Search</button>
      </div>
      <ul className='navbar-links'>
        <li><Link to="/messages">Messaging</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar