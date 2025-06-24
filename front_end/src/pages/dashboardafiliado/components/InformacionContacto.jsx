import React, { useEffect, useState } from "react"
import "./InformacionContacto.css"

export default function InformacionContacto() {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/api/afiliado/perfil", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setInfo(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="card-af">
      <h3>📇 Mi Información de Contacto</h3>
      {loading ? <p>Cargando...</p> : info ? (
        <>
          <p>📞 {info.telefono || "No disponible"}</p>
          <p>📧 {info.email || "No disponible"}</p>
          <p>📍 {info.direccion || "No disponible"}</p>
          <button>Actualizar Información</button>
        </>
      ) : (
        <p>No se pudo obtener la información de contacto.</p>
      )}
    </div>
  )
}
