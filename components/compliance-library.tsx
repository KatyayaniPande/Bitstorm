"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Globe, Calendar, AlertTriangle, CheckCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

export function ComplianceLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [expandedCard, setExpandedCard] = useState(null)

  const regulations = [
    {
      id: 1,
      name: "EU Digital Services Act (DSA)",
      region: "EU",
      severity: "high",
      lastUpdated: "2024-01-15",
      status: "active",
      description:
        "Comprehensive regulation for digital services operating in the EU, focusing on content moderation, transparency, and user safety.",
      keyRequirements: [
        "Content moderation transparency reports",
        "Risk assessment for systemic risks",
        "User notification systems",
        "Data access for researchers",
      ],
      affectedFeatures: ["Content Moderation", "User Analytics", "Advertising"],
      penalties: "Up to 6% of global annual turnover",
      implementationDeadline: "2024-02-17",
    },
    {
      id: 2,
      name: "California - Protecting Our Kids from Social Media Addiction Act",
      region: "US-CA",
      severity: "high",
      lastUpdated: "2024-01-10",
      status: "active",
      description:
        "California law requiring social media platforms to implement design features that protect minors from addictive features.",
      keyRequirements: [
        "Default privacy settings for minors",
        "Time limits and usage notifications",
        "Prohibition of certain addictive design features",
        "Parental controls and notifications",
      ],
      affectedFeatures: ["User Interface", "Notifications", "Content Feed"],
      penalties: "Up to $5,000 per violation",
      implementationDeadline: "2024-07-01",
    },
    {
      id: 3,
      name: "COPPA (Children's Online Privacy Protection Act)",
      region: "US",
      severity: "medium",
      lastUpdated: "2023-12-01",
      status: "active",
      description: "Federal law protecting the privacy of children under 13 years old online.",
      keyRequirements: [
        "Parental consent for data collection",
        "Limited data collection from children",
        "Safe harbor provisions",
        "Data deletion upon request",
      ],
      affectedFeatures: ["User Registration", "Data Collection", "Advertising"],
      penalties: "Up to $43,792 per violation",
      implementationDeadline: "Ongoing compliance required",
    },
    {
      id: 4,
      name: "Utah Social Media Regulation Act",
      region: "US-UT",
      severity: "medium",
      lastUpdated: "2024-01-05",
      status: "pending",
      description:
        "Utah legislation requiring age verification and parental consent for minors using social media platforms.",
      keyRequirements: [
        "Age verification systems",
        "Parental consent for users under 18",
        "Time restrictions for minor users",
        "Content filtering options",
      ],
      affectedFeatures: ["User Registration", "Content Access", "Time Controls"],
      penalties: "Civil penalties up to $2,500 per violation",
      implementationDeadline: "2024-10-01",
    },
    {
      id: 5,
      name: "Florida - Online Protections for Minors",
      region: "US-FL",
      severity: "medium",
      lastUpdated: "2024-01-20",
      status: "active",
      description:
        "Florida law restricting social media access for children under 14 and requiring parental consent for ages 14-15.",
      keyRequirements: [
        "Account termination for users under 14",
        "Parental consent for ages 14-15",
        "Anonymous age verification",
        "Third-party age verification services",
      ],
      affectedFeatures: ["User Registration", "Age Verification", "Account Management"],
      penalties: "Up to $50,000 per violation",
      implementationDeadline: "2024-01-01",
    },
  ]

  const regions = [
    { value: "all", label: "All Regions" },
    { value: "EU", label: "European Union" },
    { value: "US", label: "United States" },
    { value: "US-CA", label: "California" },
    { value: "US-UT", label: "Utah" },
    { value: "US-FL", label: "Florida" },
  ]

  const severityLevels = [
    { value: "all", label: "All Severities" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ]

  const filteredRegulations = regulations.filter((reg) => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || reg.region === selectedRegion
    const matchesSeverity = selectedSeverity === "all" || reg.severity === selectedSeverity

    return matchesSearch && matchesRegion && matchesSeverity
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compliance Library</h2>
        <Badge variant="outline">{filteredRegulations.length} Regulations</Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search regulations, requirements, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {severityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Regulations Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRegulations.map((regulation) => (
          <Card key={regulation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{regulation.name}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{regulation.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>{regulation.region}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Updated {regulation.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge
                    variant={
                      regulation.severity === "high"
                        ? "destructive"
                        : regulation.severity === "medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {regulation.severity.toUpperCase()}
                  </Badge>
                  <Badge variant={regulation.status === "active" ? "default" : "secondary"}>
                    {regulation.status === "active" ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {regulation.affectedFeatures.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedCard(expandedCard === regulation.id ? null : regulation.id)}
                  >
                    {expandedCard === regulation.id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Show Details
                      </>
                    )}
                  </Button>

                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Full Text
                  </Button>
                </div>

                {expandedCard === regulation.id && (
                  <div className="border-t pt-4 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Requirements</h4>
                      <ul className="space-y-1">
                        {regulation.keyRequirements.map((req, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-1">Penalties</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{regulation.penalties}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Implementation Deadline</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{regulation.implementationDeadline}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRegulations.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No regulations found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
