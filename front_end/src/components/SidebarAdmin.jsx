import React from "react"
import '../styles/sidebaradmin.css'
import { Users, Calendar, DollarSign, Bell, LogOut, Settings, Home, Building, ClipboardList, PenTool, Stethoscope } from "lucide-react"

export default function SidebarAdmin() {
  const navItems = [
    { title: "Inicio", href: "/dashboard-admin", icon: <Home size={18} /> },
    { title: "Pacientes", href: "/afiliados", icon: <Users size={18} /> },
    { title: "Odontólogos", href: "/odontologos", icon: <Stethoscope size={18} /> },
    { title: "Turnos", href: "/turnos", icon: <Calendar size={18} /> },
    { title: "Cobros y Pagos", href: "/reportes", icon: <DollarSign size={18} /> },
    { title: "Sedes", href: "/sedes", icon: <Building size={18} /> },
    { title: "Tratamientos", href: "/tratamientos", icon: <ClipboardList size={18} /> },
    { title: "Equipamiento", href: "/equipamiento", icon: <PenTool size={18} /> },
    { title: "Configuración", href: "/configuracion", icon: <Bell size={18} /> },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/images/logo-dental.png" alt="Logo" className="sidebar-logo" />
        <h2>Consultorio Odontologico</h2>
        <p>Administrador</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <a href={item.href} key={index} className="sidebar-link">
            {item.icon}
            <span>{item.title}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <a href="/configuracion" className="sidebar-link">
          <Settings size={18} />
          <span>Configuración</span>
        </a>
        <a href="/login" className="sidebar-link logout">
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </a>
      </div>
    </aside>
  )
}
