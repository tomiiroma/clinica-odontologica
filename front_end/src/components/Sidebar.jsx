import React, { useState } from "react"
import "../styles/sidebar.css"
import {
  Users, Calendar, DollarSign, Bell, LogOut, Settings,
  Home, Building, ClipboardList, PenTool, Stethoscope,
  FileText, Clock, User, Smile
} from "lucide-react"
import { useAuth } from "../auth/useAuth"

export default function Sidebar() {
  const { rol, user } = useAuth()
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const getNavItemsByRole = (rol) => {
    switch (rol) {
      case "admin":
        return [
          { title: "Inicio", href: "/dashboard-admin", icon: <Home size={18} /> },
          { title: "Afiliados", href: "/dashboard-admin/afiliados", icon: <Users size={18} /> },
          { title: "Odontólogos", href: "/dashboard-admin/odontologos", icon: <Stethoscope size={18} /> },
          { title: "Turnos", href: "/dashboard-admin/turnos", icon: <Calendar size={18} /> },
          { title: "Cobros y Pagos", href: "/dashboard-admin/reportes", icon: <DollarSign size={18} /> },
          { title: "Sedes", href: "/dashboard-admin/sedes", icon: <Building size={18} /> },
          { title: "Consultorios", href: "/dashboard-admin/consultorios", icon: <Home size={18} /> },
          { title: "Tratamientos", href: "/dashboard-admin/tratamientos", icon: <ClipboardList size={18} /> },
          { title: "Plan de Afliacion", href: "/dashboard-admin/planAfiliacion", icon: <ClipboardList size={18} /> },
          { title: "Equipamiento", href: "/dashboard-admin/equipamiento", icon: <PenTool size={18} /> },
        ]

      case "odontologo":
        return [
          { title: "Mi Agenda", href: "/dashboard-odontologo", icon: <Calendar size={18} /> },
          { title: "Mis Pacientes", href: "/odontologo/mis-pacientes", icon: <Users size={18} /> },
          { title: "Historiales Clínicos", href: "/odontologo/historial-clinico", icon: <FileText size={18} /> },
          { title: "Turnos", href: "/odontologo/turnos", icon: <Clock size={18} /> },
        ]
      case "afiliado":
        return [
          { title: "Mis Turnos", href: "/dashboard-paciente", icon: <Calendar size={18} /> },
          { title: "Mi Historial Clínico", href: "/paciente/historial-clinico", icon: <FileText size={18} /> },
          { title: "Mis Tratamientos", href: "/paciente/mis-tratamientos", icon: <Smile size={18} /> },
          { title: "Mis Pagos", href: "/paciente/mis-pagos", icon: <DollarSign size={18} /> },
          { title: "Mi Perfil", href: "/paciente/mi-perfil", icon: <User size={18} /> },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItemsByRole(rol)

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  const titleByRole = {
    admin: "Consultorio Odontológico",
    odontologo: "Odontólogo",
    afiliado: "Paciente"
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/images/logo-dental.png" alt="Logo" className="sidebar-logo" />
        <h2>{titleByRole[rol] || "Panel"}</h2>
        <p>{rol?.charAt(0).toUpperCase() + rol?.slice(1)}</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => (
          <a key={i} href={item.href} className="sidebar-link">
            {item.icon}
            <span>{item.title}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user" onClick={() => setDropdownVisible(!dropdownVisible)}>
          <User className="user-icon" size={16} />
          <span className="sidebar-user-email">{user?.email || "Usuario"}</span>
          <span className="sidebar-caret">&#9662;</span>
        </div>
        {dropdownVisible && (
          <div className="sidebar-dropdown">
            <a href={`/${rol}/configuracion`}><Settings size={16} /> Configuración</a>
            <button onClick={handleLogout} className="sidebar-dropdown-btn">
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
