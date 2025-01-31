import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './component/Register'
import Login from './component/Login'

const App = () => {
    return (
      <Routes>
        <Route path="/" element={<Login />} /> {/* Rute utama untuk Login */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
}

export default App