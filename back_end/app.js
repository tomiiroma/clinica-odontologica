import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './auth/routes/auth.routes.js'
import adminRoutes from './modules/administrador/administrador.routes.js'
import afiliadoRoutes from './modules/afiliado/afiliado.routes.js'
import odontologoRoutes from './modules/odontologo/odontologo.routes.js'

// Nuevos módulos generados
import sedeRoutes from './modules/sede/sede.routes.js'
import consultorioRoutes from './modules/consultorio/consultorio.routes.js'
import equipamientoRoutes from './modules/equipamiento/equipamiento.routes.js'
import horarioAtencionRoutes from './modules/horario_atencion/horario_atencion.routes.js'
import turnoRoutes from './modules/turno/turno.routes.js'
import tratamientoRoutes from './modules/tratamiento/tratamiento.routes.js'
import insumoRoutes from './modules/insumo/insumo.routes.js'
import pagoRoutes from './modules/pago/pago.routes.js'
import notificacionRoutes from './modules/notificacion/notificacion.routes.js'
import planAfiliacionRoutes from './modules/plan_afiliacion/plan_afiliacion.routes.js'
import especialidadRoutes from './modules/especialidad/especialidad.routes.js'
import historiaClinicaRoutes from './modules/historia_clinica/historia_clinica.routes.js'
import tratamientoInsumoRoutes from './modules/tratamiento_insumo/tratamiento_insumo.routes.js'
import dashboardAdminRoutes from './modules/dashboardAdmin/dashboardAdmin.routes.js'
import dashboardOdontologoRoutes from './modules/dashboardOdontologo/dashboard.routes.js'



const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('public/uploads'));

// Rutas principales
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/afiliados', afiliadoRoutes)
app.use('/api/odontologos', odontologoRoutes)

// Rutas generadas automáticamente
app.use('/api/sedes', sedeRoutes)
app.use('/api/consultorios', consultorioRoutes)
app.use('/api/equipamientos', equipamientoRoutes)
app.use('/api/horarios', horarioAtencionRoutes)
app.use('/api/turnos', turnoRoutes)
app.use('/api/tratamientos', tratamientoRoutes)
app.use('/api/insumos', insumoRoutes)
app.use('/api/pagos', pagoRoutes)
app.use('/api/notificaciones', notificacionRoutes)
app.use('/api/planes', planAfiliacionRoutes)
app.use('/api/especialidades', especialidadRoutes)
app.use('/api/historias-clinicas', historiaClinicaRoutes)
app.use('/api/tratamiento-insumo', tratamientoInsumoRoutes)
app.use('/api/dashboard-admin', dashboardAdminRoutes)
app.use('/api/dashboard-odontologo', dashboardOdontologoRoutes)


export default app
