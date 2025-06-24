import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ mensaje: 'Token requerido' })

  const token = auth.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ mensaje: 'Token inválido' })
  }
}
