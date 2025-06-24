import React, { useEffect, useState } from "react"
import "./gestorOdontologo.css"
import TablaDatos from "../components/TablaDatos"
import OdontologoForm from "../components/OdontologoForm"

export default function GestorOdontologo() {
  const [odontologos, setOdontologos] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [modo, setModo] = useState(null)
  const [odontologoSeleccionado, setOdontologoSeleccionado] = useState(null)

  const fetchOdontologos = () => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/api/odontologos", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setOdontologos(data))
      .catch(err => console.error("Error al cargar odontólogos:", err))
  }

  useEffect(() => { fetchOdontologos() }, [])

const columnas = ["Nombre", "Apellido", "Email", "Teléfono", "Especialidad", "Acciones"]

  const filtrados = odontologos.filter(o =>
    o.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    o.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
    o.email?.toLowerCase().includes(busqueda.toLowerCase())
  )

  const abrirFormularioCrear = () => {
    setModo("crear")
    setOdontologoSeleccionado(null)
  }

  const abrirFormularioEditar = (odontologo) => {
    setModo("editar")
    setOdontologoSeleccionado(odontologo)
  }

  const cerrarFormulario = () => {
    setModo(null)
    setOdontologoSeleccionado(null)
    fetchOdontologos()
  }

  return (
    <div className="gestor-odontologo">
      <div className="gestor-header">
        <div>
          <h2>Gestor de Odontólogos</h2>
          <p>Administra la información de los odontólogos</p>
        </div>
        <button className="btn-nuevo" onClick={abrirFormularioCrear}>+ Nuevo Odontólogo</button>
      </div>

      {modo ? (
        <OdontologoForm
          modo={modo}
          odontologo={modo === "editar" ? odontologoSeleccionado : null}
          onClose={cerrarFormulario}
        />
      ) : (
        <>
          <div className="gestor-busqueda">
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <TablaDatos
            data={filtrados}
            columnas={columnas}
            tipo="odontologo"
            onEditar={abrirFormularioEditar}
          />
        </>
      )}
    </div>
  )
}
