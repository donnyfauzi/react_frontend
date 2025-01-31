import React from 'react'
import ReactDOM from "react-dom/client"
import App from './App'
import { BrowserRouter } from "react-router-dom";

// Cari elemen root
const rootElement = document.getElementById('root')

// Buat root dengan React 18
const root = ReactDOM.createRoot(rootElement)

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
