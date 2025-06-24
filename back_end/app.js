import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './auth/routes/auth.routes.js'
import adminRoutes from './modules/administrador/administrador.routes.js'
import afiliadoRoutes from './modules/afiliado/afiliado.routes.js'
import odontologoRoutes from './modules/odontologo/odontologo.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/api/admin', adminRoutes)
app.use('/api/afiliados', afiliadoRoutes)
app.use('/api/odontologos', odontologoRoutes)





export default app
