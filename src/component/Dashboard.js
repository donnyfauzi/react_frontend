import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login') // Jika tidak ada token, kembali ke login
    } else {
      axios
        .get('http://localhost:5000/api/protected/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch(() => {
          localStorage.removeItem('token') // Hapus token jika tidak valid
          navigate('/login')
        });
    }
  }, [navigate])

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? <p>Welcome, {user.message}</p> : <p>Loading...</p>}
      <button onClick={() => { localStorage.removeItem('token'); navigate('/login')}} >Logout</button>
    </div>
  );
};

export default Dashboard
