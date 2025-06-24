import React, { useEffect, useState } from "react"
import "./ProximosTurnosOdontologo.css"

export default function ProximosTurnosOdontologo() {
  const [turnos, setTurnos] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/api/dashboard-odontologo/proximos-turnos", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setTurnos(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="card turnos">
      <h3>Próximos Turnos</h3>
      <p className="desc">Tu agenda para hoy</p>
      {loading ? (
        <p>Cargando turnos...</p>
      ) : turnos && turnos.length > 0 ? (
        <ul>
          {turnos.map((t, i) => (
            <li key={i}>
              <strong>{t.hora} - {t.paciente}</strong> <span>{t.motivo}</span>{" "}
              <span className={`estado ${t.estado.toLowerCase()}`}>{t.estado}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Por el momento no tenés turnos asignados.</p>
      )}
      <a href="#">Ver Agenda Completa</a>
    </div>
  )
}
