"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Users,
  FolderIcon,
  FileText,
  MessageSquare,
  HardDrive,
  TrendingUp,
  Activity,
  Calendar,
  Loader2,
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalGroups: number
    totalFolders: number
    totalFiles: number
    totalMessages: number
    totalStorage: number
  }
  recentActivity: Array<{
    id: string
    name: string
    type: "group" | "folder"
    lastActivity: string
    memberCount?: number
    messageCount?: number
    fileCount?: number
  }>
  activityChart: Array<{
    date: string
    groups: number
    folders: number
    files: number
  }>
  storageBreakdown: {
    images: number
    documents: number
    videos: number
    others: number
  }
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

export default function AnalysisMain() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      // In a real app, get userId from authentication
      const userId = localStorage.getItem("uid") || "user123"

      const response = await fetch(`/api/analytics?userId=${userId}`)
      const data = await response.json()

      if (data.success) {
        setAnalytics(data.analytics)
      } else {
        setError(data.error || "Failed to fetch analytics")
      }
    } catch (err) {
      setError("Failed to fetch analytics")
      console.error("Analytics fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchAnalytics}>Retry</Button>
        </div>
      </div>
    )
  }

  if (!analytics) return null

  const pieData = [
    { name: "Images", value: analytics.storageBreakdown.images, color: COLORS[0] },
    { name: "Documents", value: analytics.storageBreakdown.documents, color: COLORS[1] },
    { name: "Videos", value: analytics.storageBreakdown.videos, color: COLORS[2] },
    { name: "Others", value: analytics.storageBreakdown.others, color: COLORS[3] },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive overview of your PicDB usage</p>
        </div>
        <Button onClick={fetchAnalytics} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{analytics.overview.totalGroups}</div>
            <p className="text-xs text-gray-600 mt-1">Active group rooms</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Folders</CardTitle>
            <FolderIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.overview.totalFolders}</div>
            <p className="text-xs text-gray-600 mt-1">Organized folders</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{analytics.overview.totalFiles}</div>
            <p className="text-xs text-gray-600 mt-1">Uploaded files</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{analytics.overview.totalMessages}</div>
            <p className="text-xs text-gray-600 mt-1">Group messages</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatBytes(analytics.overview.totalStorage)}</div>
            <p className="text-xs text-gray-600 mt-1">Total storage</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Activity Over Time
            </CardTitle>
            <CardDescription>Daily activity for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.activityChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  labelFormatter={(value) => formatDate(value as string)}
                  formatter={(value, name) => [
                    value,
                    name === "groups" ? "Groups" : name === "folders" ? "Folders" : "Files",
                  ]}
                />
                <Line type="monotone" dataKey="groups" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="folders" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="files" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Storage Breakdown */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              File Type Distribution
            </CardTitle>
            <CardDescription>Breakdown of files by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your latest groups and folders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.recentActivity.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            ) : (
              analytics.recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.type === "group" ? (
                      <Users className="h-5 w-5 text-blue-600" />
                    ) : (
                      <FolderIcon className="h-5 w-5 text-green-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.type === "group"
                          ? `${item.memberCount} members, ${item.messageCount} messages`
                          : `${item.fileCount} files`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={item.type === "group" ? "default" : "secondary"}>{item.type}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{new Date(item.lastActivity).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
