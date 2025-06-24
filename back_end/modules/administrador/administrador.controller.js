import {
  crearAdministrador,
  buscarAdministradorPorEmail,
} from './administrador.service.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registrarAdmin = async (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body

  const existente = await buscarAdministradorPorEmail(email)
  if (existente) return res.status(400).json({ mensaje: 'Ya existe un administrador con ese email' })

  const hash = await bcrypt.hash(contraseña, 10)
  const nuevo = await crearAdministrador({ nombre, apellido, email, contraseña: hash })

  res.status(201).json({ id: nuevo.id_administrador, email: nuevo.email })
}

export const loginAdmin = async (req, res) => {
  const { email, contraseña } = req.body

  const admin = await buscarAdministradorPorEmail(email)
  if (!admin) return res.status(404).json({ mensaje: 'Administrador no encontrado' })

  const valido = await bcrypt.compare(contraseña, admin.contraseña)
  if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' })

  const token = jwt.sign({ id: admin.id_administrador, email: admin.email, rol: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' })
  res.json({ token })
}

export const obtenerPerfil = async (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, rol: req.user.rol })
}
