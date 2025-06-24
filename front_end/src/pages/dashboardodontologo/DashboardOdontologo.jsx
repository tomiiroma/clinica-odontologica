import React from "react"
import "./DashboardOdontologo.css"
import InfoCardsOdontologo from "./components/InfoCardsOdontologo"
import ProximosTurnosOdontologo from "./components/ProximosTurnosOdontologo"
import ActividadRecienteOdontologo from "./components/ActividadRecienteOdontologo"
import QuickActionsOdontologo from "./components/QuickActionsOdontologo"

export default function DashboardOdontologo() {
  return (
    <div className="dashboard-odontologo">

      <InfoCardsOdontologo />

      <div className="main-sections">
        <ProximosTurnosOdontologo />
        <ActividadRecienteOdontologo />
      </div>

      <QuickActionsOdontologo />
    </div>
  )
}
