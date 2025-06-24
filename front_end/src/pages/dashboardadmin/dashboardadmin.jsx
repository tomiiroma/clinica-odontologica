import React, { useEffect, useState } from "react"
import "./dashboardadmin.css"
import QuickActions from "./components/QuickActions"
import RecentAppointments from "./components/RecentAppointments"
import { Users, Calendar, MapPin, Stethoscope } from "lucide-react"

export default function DashboardAdmin() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/api/dashboard-admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error al cargar estadísticas:", err)
        setLoading(false)
      })
  }, [])

  const cards = stats ? [
    { title: "Afiliados Activos", value: stats.afiliadosActivos, icon: <Users size={18} />, class: "blue" },
    { title: "Turnos Hoy", value: stats.turnosHoy, icon: <Calendar size={18} />, class: "green" },
    { title: "Sedes", value: stats.totalSedes, icon: <MapPin size={18} />, class: "purple" },
    { title: "Odontólogos", value: stats.totalOdontologos, icon: <Stethoscope size={18} />, class: "orange" },
  ] : []

  return (
    <div>
      {loading ? (
        <p>Cargando estadísticas...</p>
      ) : (
        <>
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
          <div className="dashboard-panels">
            <QuickActions />
            <RecentAppointments />
          </div>
        </>
      )}
    </div>
  )
}
