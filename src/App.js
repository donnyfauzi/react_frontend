import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './component/Dashboard'
import EditArticle from './component/EditArticle';
import TabTrashed from './component/TabTrashed';
import AddArticle from "./component/AddArticle";

const App = () => {
    return (
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/edit-article/:id' element={<EditArticle />} />
        <Route path='/trashed-articles' element={<TabTrashed />} />
        <Route path='/add-article' element={<AddArticle />} />

      </Routes>
    );
}

export default App