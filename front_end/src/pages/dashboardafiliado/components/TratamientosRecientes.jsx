import React, { useEffect, useState } from "react"
import "./TratamientosRecientes.css"

export default function TratamientosRecientes() {
  const [tratamientos, setTratamientos] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/api/dashboard-afiliado/actividad-reciente", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setTratamientos(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="card-af">
      <h3>🦷 Mis Tratamientos Recientes</h3>
      {loading ? <p>Cargando...</p> : tratamientos && tratamientos.length > 0 ? (
        <ul>
          {tratamientos.map((t, i) => (
            <li key={i}>
              <strong>{t.descripcion}</strong> <br />
              <span>Fecha: {t.fecha}</span> <span className={`estado ${t.estado.toLowerCase()}`}>{t.estado}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tenés tratamientos recientes.</p>
      )}
      <a href="#">Ver Historial Completo</a>
    </div>
  )
}
