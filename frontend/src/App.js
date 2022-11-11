import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Reservation from './components/Reservation'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Register' element={<Register/>} />
          <Route path='/Reservation' element={<Reservation/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
