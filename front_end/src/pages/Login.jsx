"use client"

import { useState } from "react"
import { Navigate } from "react-router-dom"
import { User, Lock } from "lucide-react"
import { useAuth } from "../auth/useAuth"
import "../styles/Login.css"
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function LoginForm() {
  const { isLoggedIn, rol } = useAuth()

  // Si ya hay sesión activa, redirigir
  if (isLoggedIn) {
    return <Navigate to={`/dashboard-${rol}`} replace />
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Por favor completa todos los campos")
      return
    }

    try {
      const roles = ["afiliado", "odontologo", "admin"]
      for (const rol of roles) {
        const res = await fetch(`http://localhost:3000/api/auth/login/${rol}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, contraseña: password })
        })

        const data = await res.json()

        if (res.ok) {
          localStorage.setItem("token", data.token)
          window.location.href = `/dashboard-${rol}`
          return
        }
      }

      alert("Credenciales inválidas para todos los roles")
    } catch (error) {
      console.error(error)
      alert("Error de conexión con el servidor")
    }
  }

  return (
    <div className="login-page">
      <NavBar />

      <div className="login-container">
        <div className="login-form-box">
          <div className="login-header">
            <img src="/images/logo-dental.png" alt="Logo" className="login-logo" />
            <h1 className="login-title">Sistema de Gestión</h1>
            <p className="login-subtitle">Accede a tu cuenta del sistema</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">Correo electrónico</label>
            <div className="login-input-wrapper">
              <User className="login-icon" />
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label htmlFor="password">Contraseña</label>
            <div className="login-input-wrapper">
              <Lock className="login-icon" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-options">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                Recordarme
              </label>
              <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </form>

          <p className="login-help">
            ¿Necesitas ayuda? <a href="#">Contacta al administrador</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
