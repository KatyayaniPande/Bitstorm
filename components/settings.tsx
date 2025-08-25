"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Bell, Shield, Database, Zap, Users, Globe, Save, RefreshCw } from "lucide-react"

interface SettingsProps {
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

export function Settings({ darkMode, setDarkMode }: SettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <Badge variant="outline">System Configuration</Badge>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <span>Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Dark Mode</h4>
              <p className="text-sm text-gray-500">Toggle between light and dark themes</p>
            </div>
            <Button variant={darkMode ? "default" : "outline"} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
              {darkMode ? "Dark" : "Light"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Analysis Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Analysis Mode</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="quick">Quick Scan</option>
                <option value="deep">Deep Analysis</option>
                <option value="comprehensive">Comprehensive Review</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Default Confidence Threshold: 75%</label>
              <input type="range" min="0" max="100" defaultValue="75" className="w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Auto-Analysis Triggers</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">New feature submissions</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Regulation updates</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Scheduled reviews</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium">High-risk features detected</span>
                <p className="text-sm text-gray-500">Immediate alerts for non-compliant features</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium">Regulation updates</span>
                <p className="text-sm text-gray-500">New or changed compliance requirements</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium">Weekly compliance reports</span>
                <p className="text-sm text-gray-500">Summary of compliance status and trends</p>
              </div>
              <input type="checkbox" className="rounded" />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <span className="font-medium">Analysis completion</span>
                <p className="text-sm text-gray-500">Notifications when analyses finish</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Regional Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Operating Regions</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { code: "US", name: "United States", flag: "🇺🇸" },
                { code: "EU", name: "European Union", flag: "🇪🇺" },
                { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
                { code: "CA", name: "Canada", flag: "🇨🇦" },
                { code: "AU", name: "Australia", flag: "🇦🇺" },
                { code: "JP", name: "Japan", flag: "🇯🇵" },
              ].map((region) => (
                <label key={region.code} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">
                    {region.flag} {region.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>System Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-green-500" />
                <span className="text-sm">Regulation Database</span>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Online
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-500" />
                <span className="text-sm">Analysis Engine</span>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Active
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-green-500" />
                <span className="text-sm">Notification Service</span>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Running
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">User Management</span>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Maintenance
              </Badge>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Status
            </Button>
            <Button variant="outline" size="sm">
              <Database className="w-4 h-4 mr-2" />
              Update Database
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
