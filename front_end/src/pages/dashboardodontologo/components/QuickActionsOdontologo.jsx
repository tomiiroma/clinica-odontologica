import React from "react"
import "./QuickActionsOdontologo.css"

export default function QuickActionsOdontologo() {
  return (
    <div className="quick-actions">
      <h4>Acciones Rápidas</h4>
      <p className="desc">Realiza tareas comunes rápidamente</p>
      <div className="buttons">
        <button className="btn azul">📅 Programar Nuevo Turno</button>
        <button className="btn verde">📋 Registrar Consulta</button>
        <button className="btn violeta">👨‍⚕️ Ver Mis Pacientes</button>
      </div>
    </div>
  )
}
