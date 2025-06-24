import React, { useEffect, useState } from "react"
import "./ProximoTurno.css"

export default function ProximoTurno() {
  const [turno, setTurno] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/api/dashboard-afiliado/proximos-turnos", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setTurno(data[0])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="card-af">
      <h3>📅 Tu Próximo Turno</h3>
      {loading ? <p>Cargando turno...</p> : turno ? (
        <div>
          <p><strong>Fecha y Hora:</strong> {turno.fecha} a las {turno.hora}</p>
          <p><strong>Tratamiento:</strong> {turno.tratamiento}</p>
          <p><strong>Doctor:</strong> {turno.doctor}</p>
          <p><strong>Sede:</strong> {turno.sede}</p>
          <button>Reprogramar Turno</button>
        </div>
      ) : (
        <p>Por el momento no tenés ningún turno asignado.</p>
      )}
    </div>
  )
}
