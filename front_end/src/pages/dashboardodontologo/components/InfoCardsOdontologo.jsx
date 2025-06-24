import React, { useEffect, useState } from "react"
import "./InfoCardsOdontologo.css"

export default function InfoCardsOdontologo() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/api/dashboard-odontologo/resumen", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Cargando resumen...</p>
  if (!data) return <p>Por el momento no tenés datos disponibles.</p>

  return (
    <div className="info-cards">
      <div className="card">
        <h4>Turnos Hoy</h4>
        <p>{data.turnosHoy || 0}</p>
      </div>
      <div className="card">
        <h4>Mis Pacientes</h4>
        <p>{data.pacientesActivos || 0}</p>
      </div>
      <div className="card">
        <h4>Tratamientos en Curso</h4>
        <p>{data.tratamientosEnCurso || 0}</p>
      </div>
    </div>
  )
}
