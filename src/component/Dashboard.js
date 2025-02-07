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
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img src="/assets/img/logo.png" alt="Logo" />
          <span className="d-none d-lg-block">NiceAdmin</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>

      {/* <div>{user ? <p>Welcome, {user.message}</p> : <p>Loading...</p>}</div> */}

      <div className="search-bar">
        <form className="search-form d-flex align-items-center">
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          {/* <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button> */}
        </form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle" href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">4</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src="/assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {user?.message || "Loading..."}
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{user?.message || "Guest"}</h6>
                <span>Web Designer</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Dashboard
