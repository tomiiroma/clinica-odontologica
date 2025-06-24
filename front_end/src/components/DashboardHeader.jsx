import React from "react"
import "../styles/dashboardheader.css"
import { Bell, User } from "lucide-react"
import { useAuth } from "../auth/useAuth"

export default function DashboardHeader({ title }) {
  const { user } = useAuth()

  return (
    <header className="dashboard-header">
      <h1 className="dashboard-header-title">{title}</h1>

      <div className="dashboard-header-actions">
        <div className="icon-button" title="Notificaciones">
          <Bell size={18} />
        </div>
        <div className="user-info">
          <User size={16} />
          <span>{user?.email || "Usuario"}</span>
        </div>
      </div>
    </header>
  )
}
