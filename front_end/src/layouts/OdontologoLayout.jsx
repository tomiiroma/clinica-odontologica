import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import DashboardHeader from "../components/DashboardHeader"
import "./AdminLayout.css" 

export default function OdontologoLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <DashboardHeader title="Panel del Odontólogo" />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
