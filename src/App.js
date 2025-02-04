import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './component/Register'
import Login from './component/Login'
import Dashboard from './component/Dashboard'
import ProtectedRoute from './component/ProtectedRute'


const App = () => {
    return (
      <Routes>
        <Route path='/' element={<Login />} /> {/* Rute utama untuk Login */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* Rute yang dilindungi, hanya bisa diakses jika user login */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    )
}

export default App