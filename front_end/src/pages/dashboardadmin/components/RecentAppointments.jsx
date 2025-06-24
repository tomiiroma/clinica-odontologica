import React, { useEffect, useState } from "react"
import "./RecentAppointments.css"
import { Clock, User } from "lucide-react"

export default function RecentAppointments() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/dashboard-admin/ultimos-turnos")
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Error al cargar turnos recientes:", err))
  }, [])

  const getStatusClass = (status) => {
    switch (status) {
      case "confirmado": return "badge badge-green"
      case "pendiente": return "badge badge-yellow"
      case "completado": return "badge badge-blue"
      default: return "badge"
    }
  }

  return (
    <div className="recent-card">
      <h3>Turnos Recientes</h3>
      <p className="subtitle">Próximas citas programadas</p>
      <div className="recent-list">
        {appointments.map((a, i) => (
          <div key={i} className="recent-item">
            <div className="recent-info">
              <div className="time"><Clock size={14} /> {a.hora}</div>
              <div>
                <div className="name"><User size={14} /> {a.afiliado}</div>
                <div className="desc">{a.odontologo} • {a.tratamiento}</div>
              </div>
            </div>
            <span className={getStatusClass(a.estado)}>{a.estado.charAt(0).toUpperCase() + a.estado.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
