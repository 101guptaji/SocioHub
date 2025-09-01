import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import { Feed } from './pages/Feed';
import Profile from './pages/Profile';
import EditProfileModal from './components/EditProfileModal';
import Navbar from './components/Navbar';
import Messages from './pages/Messages';
import UsersList from './pages/UsersList';
import './app.css'

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("token");
  return isAuth ? children : <Navigate to="/login" />;
};

function App() {

  return (
    <Router>
      <Toaster position='top-right'/>
      <header>
      <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/edit-profile" element={<PrivateRoute><EditProfileModal /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><UsersList /></PrivateRoute>} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
