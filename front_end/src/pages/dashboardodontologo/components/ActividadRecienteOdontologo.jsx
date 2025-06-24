import React, { useEffect, useState } from "react"
import "./ActividadRecienteOdontologo.css"

export default function ActividadRecienteOdontologo() {
  const [actividades, setActividades] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/api/dashboard-odontologo/actividad-reciente", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setActividades(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="card actividad">
      <h3>Actividad Reciente</h3>
      <p className="desc">Últimas interacciones con pacientes</p>
      {loading ? (
        <p>Cargando actividad...</p>
      ) : actividades && actividades.length > 0 ? (
        <ul>
          {actividades.map((a, i) => (
            <li key={i}>
              <strong>{a.tipo}: {a.paciente}</strong> <span>{a.descripcion}</span>
              <span className="fecha">{a.fecha}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Por el momento no hay actividad reciente.</p>
      )}
      <a href="#">Ver Historial Completo</a>
    </div>
  )
}
