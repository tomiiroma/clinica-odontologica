import React, { useEffect, useState } from "react"
import "./GestorAfiliado.css"
import TablaDatos from "../components/TablaDatos"
import AfiliadoForm from "../components/AfiliadoForm"

export default function GestorAfiliado() {
  const [afiliados, setAfiliados] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [modo, setModo] = useState(null) // "crear" o "editar"
  const [afiliadoSeleccionado, setAfiliadoSeleccionado] = useState(null)

  const fetchAfiliados = () => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/api/afiliados", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar afiliados")
        return res.json()
      })
      .then((data) => {
        setAfiliados(data)
      })
      .catch((err) => {
        console.error("Error al cargar afiliados:", err)
      })
  }

  useEffect(() => {
    fetchAfiliados()
  }, [])

  const columnas = ["Nombre", "Apellido", "DNI", "Teléfono", "Dirección", "Tipo afiliación", "Acciones"]

  const filtrados = afiliados.filter(
    (a) =>
      a.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.dni?.includes(busqueda)
  )

  const abrirFormularioCrear = () => {
    setModo("crear")
    setAfiliadoSeleccionado(null)
  }

  const abrirFormularioEditar = (afiliado) => {
    setModo("editar")
    setAfiliadoSeleccionado(afiliado)
  }

  const cerrarFormulario = () => {
    setModo(null)
    setAfiliadoSeleccionado(null)
    fetchAfiliados()
  }

  return (
    <div className="gestor-afiliado">
      <div className="gestor-header">
        <div>
          <h2>Gestor de Afiliados</h2>
          <p>Administra la información de los pacientes</p>
        </div>
        <button className="btn-nuevo" onClick={abrirFormularioCrear}>
          + Nuevo Afiliado
        </button>
      </div>

      {modo ? (
        <AfiliadoForm
          modo={modo}
          afiliadoId={modo === "editar" ? afiliadoSeleccionado?.id_afiliado : null}
          onClose={cerrarFormulario}
        />
      ) : (
        <>
          <div className="gestor-busqueda">
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o DNI..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <TablaDatos
            data={filtrados}
            columnas={columnas}
            tipo="afiliado"
            onEditar={abrirFormularioEditar}
          />
        </>
      )}
    </div>
  )
}
