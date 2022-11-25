import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Reservation from './pages/Reservation'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Register' element={<Register/>} />
          <Route path='/Reservation' element={<Reservation/>} />
          <Route path='/Login' element={<Login/>} />
        </Routes>
    </div>
  );
}

export default App; 
