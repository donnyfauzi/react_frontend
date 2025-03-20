import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './component/Dashboard'
import AddArticle from "./component/AddArticle";

const App = () => {
    return (
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/add-article' element={<AddArticle />} />

      </Routes>
    );
}

export default App