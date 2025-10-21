"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import Footer from "@/components/main/footer";
import Header from "@/components/main/header";
import {
  FolderIcon,
  UsersIcon,
  FileIcon,
  HardDriveIcon,
  TrendingUpIcon,
  CalendarIcon,
  ImageIcon,
  FileTextIcon,
  VideoIcon,
  MoreHorizontalIcon,
  ActivityIcon,
  BarChart3Icon
} from "lucide-react";

interface AnalyticsData {
  overview: {
    totalGroups: number;
    totalFolders: number;
    totalFiles: number;
    totalMessages: number;
    totalStorage: number;
  };
  recentActivity: Array<{
    id: string;
    name: string;
    type: string;
    lastActivity: string;
    memberCount?: number;
    messageCount?: number;
    fileCount?: number;
  }>;
  activityChart: Array<{
    date: string;
    groups: number;
    folders: number;
    files: number;
  }>;
  storageBreakdown: {
    images: number;
    documents: number;
    videos: number;
    others: number;
  };
}

export default function Insights() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Get userId from localStorage or auth context
      const userId = localStorage.getItem("userId") || "demo-user";

      const response = await fetch(`/api/analysis?userId=${userId}`);
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
      } else {
        setError(data.error || "Failed to fetch analytics");
      }
    } catch (err) {
      setError("Failed to load insights data");
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const storageBreakdownData = analytics ? [
    { name: 'Images', value: analytics.storageBreakdown.images, color: '#3b82f6' },
    { name: 'Documents', value: analytics.storageBreakdown.documents, color: '#10b981' },
    { name: 'Videos', value: analytics.storageBreakdown.videos, color: '#f59e0b' },
    { name: 'Others', value: analytics.storageBreakdown.others, color: '#ef4444' }
  ].filter(item => item.value > 0) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 font-semibold mb-2">Error Loading Insights</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchAnalytics}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-yellow-800 font-semibold mb-2">No Data Available</h2>
            <p className="text-yellow-600">Start uploading files and creating groups to see your insights!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Insights & Analytics</h1>
            <p className="text-gray-600">Detailed overview of your PicDB usage and activity</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Files</CardTitle>
                <FileIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.overview.totalFiles.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Files uploaded
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <HardDriveIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatFileSize(analytics.overview.totalStorage)}</div>
                <p className="text-xs text-muted-foreground">
                  Total space consumed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Groups</CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.overview.totalGroups.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Active groups
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Folders</CardTitle>
                <FolderIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.overview.totalFolders.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Organized folders
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Activity Trends</TabsTrigger>
              <TabsTrigger value="storage">Storage Breakdown</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            </TabsList>

            {/* Activity Trends Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="h-5 w-5" />
                    Activity Over Time
                  </CardTitle>
                  <CardDescription>
                    Your upload and creation activity for the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.activityChart}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(value) => formatDate(value)}
                          formatter={(value, name) => [value, name === 'files' ? 'Files' : name === 'groups' ? 'Groups' : 'Folders']}
                        />
                        <Bar dataKey="files" fill="#3b82f6" name="files" />
                        <Bar dataKey="groups" fill="#10b981" name="groups" />
                        <Bar dataKey="folders" fill="#f59e0b" name="folders" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Storage Breakdown Tab */}
            <TabsContent value="storage" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3Icon className="h-5 w-5" />
                      File Type Distribution
                    </CardTitle>
                    <CardDescription>
                      Breakdown of your files by type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={storageBreakdownData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {storageBreakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [value, 'Files']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Storage Details</CardTitle>
                    <CardDescription>
                      Detailed breakdown by file category
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <ImageIcon className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-medium">Images</p>
                          <p className="text-sm text-muted-foreground">Photos and graphics</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{analytics.storageBreakdown.images} files</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileTextIcon className="h-8 w-8 text-green-500" />
                        <div>
                          <p className="font-medium">Documents</p>
                          <p className="text-sm text-muted-foreground">PDFs and text files</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{analytics.storageBreakdown.documents} files</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <VideoIcon className="h-8 w-8 text-orange-500" />
                        <div>
                          <p className="font-medium">Videos</p>
                          <p className="text-sm text-muted-foreground">Video files</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{analytics.storageBreakdown.videos} files</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <MoreHorizontalIcon className="h-8 w-8 text-red-500" />
                        <div>
                          <p className="font-medium">Others</p>
                          <p className="text-sm text-muted-foreground">Other file types</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{analytics.storageBreakdown.others} files</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Recent Activity Tab */}
            <TabsContent value="recent" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ActivityIcon className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your latest groups and folders activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.recentActivity.length > 0 ? (
                      analytics.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {activity.type === 'group' ? (
                              <UsersIcon className="h-8 w-8 text-blue-500" />
                            ) : (
                              <FolderIcon className="h-8 w-8 text-green-500" />
                            )}
                            <div>
                              <p className="font-medium">{activity.name}</p>
                              <p className="text-sm text-muted-foreground capitalize">{activity.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              {formatDate(activity.lastActivity)}
                            </p>
                            <div className="flex gap-2 mt-1">
                              {activity.memberCount && (
                                <Badge variant="outline" className="text-xs">
                                  {activity.memberCount} members
                                </Badge>
                              )}
                              {activity.messageCount !== undefined && (
                                <Badge variant="outline" className="text-xs">
                                  {activity.messageCount} messages
                                </Badge>
                              )}
                              {activity.fileCount !== undefined && (
                                <Badge variant="outline" className="text-xs">
                                  {activity.fileCount} files
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <ActivityIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No recent activity to show</p>
                        <p className="text-sm text-muted-foreground">Start creating groups and folders to see activity here!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}