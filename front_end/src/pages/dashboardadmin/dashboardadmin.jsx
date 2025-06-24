import React, { useEffect, useState } from "react"
import "./dashboardadmin.css"

import Sidebar from '../../components/Sidebar'
import DashboardHeader from "../../components/DashboardHeader"


import { Users, Calendar, MapPin, Stethoscope } from "lucide-react"

export default function DashboardAdmin() {
  const [stats, setStats] = useState({
    afiliadosActivos: 0,
    turnosHoy: 0,
    totalSedes: 0,
    totalOdontologos: 0,
  })

  useEffect(() => {
    fetch("/api/dashboard-admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error al cargar estadísticas:", err))
  }, [])

  const cards = [
    { title: "Afiliados Activos", value: stats.afiliadosActivos, icon: <Users size={18} />, class: "blue" },
    { title: "Turnos Hoy", value: stats.turnosHoy, icon: <Calendar size={18} />, class: "green" },
    { title: "Sedes", value: stats.totalSedes, icon: <MapPin size={18} />, class: "purple" },
    { title: "Odontólogos", value: stats.totalOdontologos, icon: <Stethoscope size={18} />, class: "orange" },
  ]

  return (
    <div className="dashboard-wrapper">
      <Sidebar/>
      <div className="dashboard-content">
        <DashboardHeader title="Panel de Control del Administrador" />
        <h1 className="dashboard-title">Panel de Control del Administrador</h1>
        <div className="cards-container">
          {cards.map((c, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-card-header">
                <span>{c.title}</span>
                <div className={`stat-icon ${c.class}`}>{c.icon}</div>
              </div>
              <div className="stat-value">{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
