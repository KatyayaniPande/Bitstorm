"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Play, CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react"

interface FeatureAnalysisProps {
  onAnalysisComplete: (result: any) => void
}

export function FeatureAnalysis({ onAnalysisComplete }: FeatureAnalysisProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    regions: [],
    codeSnippet: "",
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [analysisMode, setAnalysisMode] = useState("quick")
  const [confidenceThreshold, setConfidenceThreshold] = useState(75)

  const categories = ["Content", "Commerce", "Safety", "Analytics", "Social"]

  const regions = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "EU", name: "European Union", flag: "🇪🇺" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
  ]

  const analysisSteps = [
    "Parsing feature description...",
    "Checking regulatory database...",
    "Analyzing code patterns...",
    "Generating compliance report...",
    "Finalizing recommendations...",
  ]

  const sampleFeatures = [
    {
      title: "Location-based content filtering for France copyright compliance",
      description:
        "Implement geo-fencing to restrict certain copyrighted content in France based on local copyright laws and licensing agreements.",
      category: "Content",
      regions: ["EU"],
      codeSnippet: 'if (userLocation === "FR") { filterCopyrightedContent(); }',
    },
    {
      title: "Age verification system for Indonesian users",
      description:
        "Enhanced age verification process for users in Indonesia to comply with local digital protection laws for minors.",
      category: "Safety",
      regions: ["ID"],
      codeSnippet: 'if (userCountry === "ID") { requireAgeVerification(); }',
    },
  ]

  const handleAnalyze = async () => {
    if (!formData.title || !formData.description) return

    setIsAnalyzing(true)
    setAnalysisStep(0)

    // Simulate analysis steps
    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisStep(i)
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    // Generate mock result
    const riskScore = Math.floor(Math.random() * 100)
    const status = riskScore < 30 ? "compliant" : riskScore < 70 ? "needs-review" : "non-compliant"

    const result = {
      title: formData.title,
      category: formData.category,
      status,
      riskScore,
      timestamp: new Date().toLocaleString(),
      regulations: [
        { name: "EU Digital Services Act", severity: "medium", applicable: true },
        { name: "COPPA", severity: "low", applicable: false },
        { name: "California CCPA", severity: "high", applicable: true },
      ],
      reasoning: `Based on the analysis of "${formData.title}", the system identified potential compliance concerns related to data processing and user privacy. The feature involves ${formData.category.toLowerCase()} functionality which requires careful consideration of regional regulations.`,
      actions: [
        "Implement data encryption for EU users",
        "Add consent management for California users",
        "Review data retention policies",
        "Update privacy policy documentation",
      ],
      similarCases: [
        "Location-based advertising restrictions (Risk Score: 45)",
        "User data collection for analytics (Risk Score: 62)",
      ],
    }

    setAnalysisResult(result)
    setIsAnalyzing(false)
    onAnalysisComplete(result)
  }

  const loadSampleFeature = (sample) => {
    setFormData(sample)
    setAnalysisResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Feature Analysis</h2>
        <div className="flex space-x-2">
          {sampleFeatures.map((sample, index) => (
            <Button key={index} variant="outline" size="sm" onClick={() => loadSampleFeature(sample)}>
              Load Sample {index + 1}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Feature Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter feature title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[120px]"
                  placeholder="Describe the feature functionality, data handling, and user interactions..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Target Regions</label>
                <div className="grid grid-cols-2 gap-2">
                  {regions.map((region) => (
                    <label key={region.code} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.regions.includes(region.code)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, regions: [...formData.regions, region.code] })
                          } else {
                            setFormData({ ...formData, regions: formData.regions.filter((r) => r !== region.code) })
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">
                        {region.flag} {region.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Code Snippet (Optional)</label>
                <Textarea
                  value={formData.codeSnippet}
                  onChange={(e) => setFormData({ ...formData, codeSnippet: e.target.value })}
                  className="font-mono text-sm"
                  placeholder="Paste relevant code snippets..."
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Analysis Mode</span>
                  <div className="flex space-x-2">
                    <Button
                      variant={analysisMode === "quick" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAnalysisMode("quick")}
                    >
                      Quick Scan
                    </Button>
                    <Button
                      variant={analysisMode === "deep" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAnalysisMode("deep")}
                    >
                      Deep Analysis
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Confidence Threshold: {confidenceThreshold}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={!formData.title || !formData.description || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Analyze Compliance
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {isAnalyzing && (
            <Card>
              <CardHeader>
                <CardTitle>Analysis in Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          index < analysisStep
                            ? "bg-green-500"
                            : index === analysisStep
                              ? "bg-blue-500 animate-pulse"
                              : "bg-gray-300"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          index <= analysisStep ? "text-gray-900 dark:text-white" : "text-gray-500"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {analysisResult && (
            <div className="space-y-4">
              {/* Status Card */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mb-4">
                      {analysisResult.status === "compliant" && (
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      )}
                      {analysisResult.status === "needs-review" && (
                        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />
                      )}
                      {analysisResult.status === "non-compliant" && (
                        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {analysisResult.status === "compliant" && "Compliant"}
                      {analysisResult.status === "needs-review" && "Needs Review"}
                      {analysisResult.status === "non-compliant" && "Non-Compliant"}
                    </h3>
                    <div className="text-3xl font-bold mb-2">Risk Score: {analysisResult.riskScore}</div>
                    <Badge
                      variant={
                        analysisResult.status === "compliant"
                          ? "default"
                          : analysisResult.status === "needs-review"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {analysisResult.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Regulations */}
              <Card>
                <CardHeader>
                  <CardTitle>Affected Regulations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.regulations.map((reg, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{reg.name}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant={reg.applicable ? "default" : "secondary"}>
                            {reg.applicable ? "Applicable" : "Not Applicable"}
                          </Badge>
                          <Badge
                            variant={
                              reg.severity === "high"
                                ? "destructive"
                                : reg.severity === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {reg.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reasoning */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Reasoning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{analysisResult.reasoning}</p>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Required Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysisResult.actions.map((action, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Similar Cases */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysisResult.similarCases.map((case_, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{case_}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
