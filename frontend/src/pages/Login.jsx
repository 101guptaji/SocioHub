import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/slices/authSlice'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import '../styles/loginRegister.css'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Logging in...');
    try {
      await dispatch(loginUser({ ...formData })).unwrap();
      toast.success('Login successful!', { id: toastId });
      navigate('/feed');
    } catch (error) {
      toast.error(error?.message || 'Login failed', { id: toastId });
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div style={{ color:'red', marginTop:2 }}>{error}</div>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}

export default Login