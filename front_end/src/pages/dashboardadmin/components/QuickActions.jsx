import React from "react"
import "./QuickActions.css"
import { UserPlus, Calendar, FileText, Settings } from "lucide-react"

export default function QuickActions() {
  const actions = [
    {
      title: "Registrar Afiliado",
      description: "Agregar nuevo paciente al sistema",
      icon: <UserPlus size={16} />,
      href: "/registro-afiliados",
    },
    {
      title: "Programar Turno",
      description: "Asignar nueva cita médica",
      icon: <Calendar size={16} />,
      href: "/turnos",
    },
    {
      title: "Generar Reporte",
      description: "Crear informe administrativo",
      icon: <FileText size={16} />,
      href: "/reportes",
    },
    {
      title: "Configuración",
      description: "Ajustar parámetros del sistema",
      icon: <Settings size={16} />,
      href: "/configuracion",
    },
  ]

  return (
    <div className="quick-card">
      <h3>Acciones Rápidas</h3>
      <p className="subtitle">Tareas más comunes del sistema</p>
      <div className="quick-grid">
        {actions.map((action, i) => (
          <button key={i} className="quick-btn" onClick={() => window.location.href = action.href}>
            <div className="quick-icon">{action.icon}</div>
            <div>
              <strong>{action.title}</strong>
              <p>{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
