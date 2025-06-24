import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Sedes from '../pages/Sedes'
import Tratamientos from '../pages/Tratamientos'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sedes" element={<Sedes />} />
        <Route path="/tratamientos" element={<Tratamientos />} />
      </Routes>
    </BrowserRouter>
  )
}
