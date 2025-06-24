export const soloAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso denegado: solo administradores' })
  }
  next()
}
