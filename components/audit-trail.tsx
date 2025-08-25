"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Calendar, User, FileText, CheckCircle, AlertTriangle, XCircle, Search, Eye } from "lucide-react"

interface AuditTrailProps {
  analysisHistory: any[]
}

export function AuditTrail({ analysisHistory }: AuditTrailProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Mock audit data combined with real analysis history
  const mockAuditEntries = [
    {
      id: "audit-1",
      timestamp: "2024-01-25 14:30:22",
      action: "Feature Analysis",
      user: "admin@tiktok.com",
      title: "Content Moderation AI Update",
      status: "compliant",
      riskScore: 25,
      category: "Safety",
      details: "Automated analysis completed successfully",
    },
    {
      id: "audit-2",
      timestamp: "2024-01-25 13:15:10",
      action: "Manual Review",
      user: "compliance@tiktok.com",
      title: "EU Data Processing Review",
      status: "needs-review",
      riskScore: 65,
      category: "Analytics",
      details: "Manual review requested for GDPR compliance",
    },
    {
      id: "audit-3",
      timestamp: "2024-01-25 11:45:33",
      action: "Policy Update",
      user: "legal@tiktok.com",
      title: "Privacy Policy Amendment",
      status: "compliant",
      riskScore: 15,
      category: "Content",
      details: "Policy updated to reflect new regulations",
    },
  ]

  // Combine mock data with real analysis history
  const allEntries = [
    ...analysisHistory.map((analysis) => ({
      id: `analysis-${Date.now()}-${Math.random()}`,
      timestamp: analysis.timestamp,
      action: "Feature Analysis",
      user: "admin@tiktok.com",
      title: analysis.title,
      status: analysis.status,
      riskScore: analysis.riskScore,
      category: analysis.category,
      details: "AI-powered compliance analysis completed",
    })),
    ...mockAuditEntries,
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const filteredEntries = allEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "needs-review":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "non-compliant":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Compliant
          </Badge>
        )
      case "needs-review":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Needs Review
          </Badge>
        )
      case "non-compliant":
        return <Badge variant="destructive">Non-Compliant</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Trail</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by feature title or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Statuses</option>
              <option value="compliant">Compliant</option>
              <option value="needs-review">Needs Review</option>
              <option value="non-compliant">Non-Compliant</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log ({filteredEntries.length} entries)</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredEntries.length > 0 ? (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="mt-1">{getStatusIcon(entry.status)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate">{entry.title}</h4>
                          {getStatusBadge(entry.status)}
                          <Badge variant="outline" className="text-xs">
                            {entry.category}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{entry.timestamp}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{entry.user}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-3 h-3" />
                            <span>{entry.action}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400">{entry.details}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 ml-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">Risk Score</div>
                        <div
                          className={`text-lg font-bold ${
                            entry.riskScore < 30
                              ? "text-green-600"
                              : entry.riskScore < 70
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {entry.riskScore}
                        </div>
                      </div>

                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No audit entries found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Analyses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{allEntries.length}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compliant</p>
                <p className="text-2xl font-bold text-green-600">
                  {allEntries.filter((e) => e.status === "compliant").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Need Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {allEntries.filter((e) => e.status === "needs-review").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
