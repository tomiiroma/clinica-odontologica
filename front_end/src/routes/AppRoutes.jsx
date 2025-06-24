import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Sedes from '../pages/Sedes'
import Tratamientos from '../pages/Tratamientos'
import DashboardAdmin from '../pages/dashboardadmin/dashboardadmin'
import GestorAfiliado from '../pages/dashboardadmin/gestorAfiliado/GestorAfiliado'
import GestorSedes from '../pages/dashboardadmin/gestorSedes/GestorSedes';
import GestorTratamientos from '../pages/dashboardadmin/gestorTratamientos/GestorTratamientos';
import OdontologoDashboard from '../pages/OdontologoDashboard';

import ProtectedRoute from '../auth/ProtectedRoute'
import AdminLayout from '../layouts/adminLayout'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sedes" element={<Sedes />} />
        <Route path="/tratamientos" element={<Tratamientos />} />



        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute allowRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardAdmin />} />
          <Route path="afiliados" element={<GestorAfiliado />} />
          <Route path="sedes" element={<GestorSedes />} />
          <Route path="tratamientos" element={<GestorTratamientos />} />




        </Route>
        <Route path="/odontologos-dashboard" element={<OdontologoDashboard />} />

      </Routes>
    </BrowserRouter>
  )
}
