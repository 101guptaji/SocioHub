import '../styles/navbar.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {searchUsers} from '../redux/slices/userSlice'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [searchUser, setSearchUser] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = async () =>{
        try {
            await dispatch(searchUsers(searchUser)).unwrap();
            navigate('/users');
            
        } catch (error) {
            toast.error(error.message || 'Search failed');
        }
    }

  return (
    <nav className='navbar'>
        <h1 className='logo'><a href="/feed">SocioHub</a></h1>
        <div className="search-bar">
            <input type="text" placeholder="Search..." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
            <button type="button" onClick={handleSearch}>Search</button>
        </div>
      <ul>
        <li><a href="/profile">Profile</a></li>
        
      </ul>
    </nav>
  )
}

export default Navbar