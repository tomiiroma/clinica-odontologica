// src/auth/ProtectedRoute.jsx
import { useAuth } from "./useAuth"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children, allowRoles = [] }) {
  const { isLoggedIn, rol } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (allowRoles.length > 0 && !allowRoles.includes(rol)) {
    return <Navigate to="/no-autorizado" replace />
  }

  return children
} 
