import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Sedes from '../pages/Sedes'
import Tratamientos from '../pages/Tratamientos'
import DashboardAdmin from '../pages/dashboardadmin/dashboardadmin'

import DashboardOdontologo from '../pages/dashboardodontologo/DashboardOdontologo'

import GestorAfiliado from '../pages/dashboardadmin/gestorAfiliado/GestorAfiliado'
import GestorSedes from '../pages/dashboardadmin/gestorSedes/GestorSedes';
import GestorConsultorio from '../pages/dashboardadmin/gestorConsultorios/GestorConsultorios';
import GestorTurnos from '../pages/dashboardadmin/gestorTurnos/GestorTurnos';
import ListaEspecialidades from '../pages/dashboardadmin/gestorEspecialidades/ListaEspecialidades'


import GestorTratamientos from '../pages/dashboardadmin/gestorTratamientos/GestorTratamientos';
import GestorOdontologo from '../pages/dashboardadmin/GestorOdontologo/GestorOdontologo';
import ProtectedRoute from '../auth/ProtectedRoute'
import AdminLayout from '../layouts/adminLayout'
import AfiliadoLayout from "../layouts/afiliadoLayout"

import GestorPlanAfiliacion from '../pages/dashboardadmin/gestorPlanAfiliacion/GestorPlanAfiliacion'
import OdontologoLayout from "../layouts/OdontologoLayout"

import DashboardAfiliado from '../pages/dashboardafiliado/DashboardAfiliado'





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
          <Route path="odontologos" element={<GestorOdontologo />} />
          <Route path="planAfiliacion" element={<GestorPlanAfiliacion />} />
          <Route path="consultorios" element={<GestorConsultorio />} />
          <Route path="turnos" element={<GestorTurnos />} />
          <Route path="especialidades" element={<ListaEspecialidades />} />


        </Route>


        <Route
          path="/dashboard-odontologo"
          element={
            <ProtectedRoute allowRoles={['odontologo']}>
              <OdontologoLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOdontologo />} />
        </Route>


        <Route
          path="/dashboard-afiliado"
          element={
            <ProtectedRoute allowRoles={['afiliado']}>
              <AfiliadoLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardAfiliado />} />
        </Route>


      </Routes>
    </BrowserRouter>
  )
}
