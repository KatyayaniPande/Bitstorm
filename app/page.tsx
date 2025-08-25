"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { FeatureAnalysis } from "@/components/feature-analysis"
import { ComplianceLibrary } from "@/components/compliance-library"
import { AuditTrail } from "@/components/audit-trail"
import { Settings } from "@/components/settings"

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [darkMode, setDarkMode] = useState(false)
  const [analysisHistory, setAnalysisHistory] = useState([])

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard analysisHistory={analysisHistory} />
      case "feature-analysis":
        return <FeatureAnalysis onAnalysisComplete={(result) => setAnalysisHistory((prev) => [result, ...prev])} />
      case "compliance-library":
        return <ComplianceLibrary />
      case "audit-trail":
        return <AuditTrail analysisHistory={analysisHistory} />
      case "settings":
        return <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
      default:
        return <Dashboard analysisHistory={analysisHistory} />
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}
