// src/auth/useAuth.js
import { jwtDecode } from "jwt-decode"

export function useAuth() {
  const token = localStorage.getItem("token")

  if (!token) return { isLoggedIn: false, user: null, rol: null }

  try {
    const decoded = jwtDecode(token)
    return {
      isLoggedIn: true,
      user: { id: decoded.id, email: decoded.email },
      rol: decoded.rol,
      token
    }
  } catch (error) {
    console.error("Token inválido o corrupto", error)
    return { isLoggedIn: false, user: null, rol: null }
  }
} 
