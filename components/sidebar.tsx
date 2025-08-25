"use client"

import { LayoutDashboard, Search, BookOpen, FileText, Settings, Shield, TrendingUp } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "feature-analysis", label: "Feature Analysis", icon: Search },
    { id: "compliance-library", label: "Compliance Library", icon: BookOpen },
    { id: "audit-trail", label: "Audit Trail", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="w-6 h-6 text-pink-500" />
          <span className="font-semibold text-gray-900 dark:text-white">Compliance Hub</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Compliance Score</span>
          </div>
          <div className="text-2xl font-bold">94%</div>
          <div className="text-xs opacity-90">+2% from last week</div>
        </div>
      </div>
    </div>
  )
}
