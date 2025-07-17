"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import {
  FolderIcon,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  FileText,
  Loader2,
  Search,
  Grid,
  List,
  Filter,
} from "lucide-react"
import { createFolder, getFolders, updateFolder, deleteFolder, type Folder } from "@/lib/folder"

export default function FolderManagementPage() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [newFolderName, setNewFolderName] = useState("")
  const [creating, setCreating] = useState(false)
  const [updating, setUpdating] = useState(false)

  // Get user ID from localStorage (in real app, from auth context)
  const userId = typeof window !== "undefined" ? localStorage.getItem("uid") || "user123" : "user123"

  useEffect(() => {
    loadFolders()
  }, [userId])

  const loadFolders = async () => {
    setLoading(true)
    try {
      const result = await getFolders(userId)
      if (result.success && result.folders) {
        setFolders(result.folders)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load folders",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading folders:", error)
      toast({
        title: "Error",
        description: "Failed to load folders",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return

    setCreating(true)
    try {
      const result = await createFolder(newFolderName.trim(), userId)
      if (result.success && result.folder) {
        setFolders((prev) => [result.folder!, ...prev])
        setNewFolderName("")
        setShowCreateModal(false)
        toast({
          title: "Success",
          description: "Folder created successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create folder",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating folder:", error)
      toast({
        title: "Error",
        description: "Failed to create folder",
        variant: "destructive",
      })
    } finally {
      setCreating(false)
    }
  }

  const handleEditFolder = async () => {
    if (!editingFolder || !newFolderName.trim()) return

    setUpdating(true)
    try {
      const result = await updateFolder(editingFolder.id, newFolderName.trim(), userId)
      if (result.success) {
        setFolders((prev) =>
          prev.map((folder) => (folder.id === editingFolder.id ? { ...folder, name: newFolderName.trim() } : folder)),
        )
        setNewFolderName("")
        setEditingFolder(null)
        setShowEditModal(false)
        toast({
          title: "Success",
          description: "Folder updated successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update folder",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating folder:", error)
      toast({
        title: "Error",
        description: "Failed to update folder",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleDeleteFolder = async (folder: Folder) => {
    if (!confirm(`Are you sure you want to delete "${folder.name}"?`)) return

    try {
      const result = await deleteFolder(folder.id, userId)
      if (result.success) {
        setFolders((prev) => prev.filter((f) => f.id !== folder.id))
        toast({
          title: "Success",
          description: "Folder deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete folder",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting folder:", error)
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      })
    }
  }

  const openEditModal = (folder: Folder) => {
    setEditingFolder(folder)
    setNewFolderName(folder.name)
    setShowEditModal(true)
  }

  const filteredFolders = folders.filter((folder) => folder.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalFiles = folders.reduce((sum, folder) => sum + folder.fileCount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Folder Management</h1>
          <p className="text-gray-600">Organize your files with folders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Folders</CardTitle>
              <FolderIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{folders.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Files</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalFiles}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Files</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {folders.length > 0 ? Math.round(totalFiles / folders.length) : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search folders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Folder
            </Button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2 text-lg">Loading folders...</span>
          </div>
        ) : filteredFolders.length === 0 ? (
          <div className="text-center py-12">
            <FolderIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No folders found" : "No folders yet"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Create your first folder to get started organizing your files"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Folder
              </Button>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                : "space-y-2"
            }
          >
            {filteredFolders.map((folder) => (
              <div
                key={folder.id}
                className={
                  viewMode === "grid"
                    ? "bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                    : "bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex items-center justify-between"
                }
              >
                <div className={viewMode === "grid" ? "" : "flex items-center gap-3"}>
                  <div className={viewMode === "grid" ? "flex items-start justify-between mb-3" : ""}>
                    <FolderIcon className="h-8 w-8 text-blue-500" />
                    {viewMode === "grid" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditModal(folder)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteFolder(folder)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                  <div className={viewMode === "list" ? "ml-3" : ""}>
                    <h3 className="font-medium text-gray-900 truncate" title={folder.name}>
                      {folder.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <FileText className="h-3 w-3" />
                      <span>{folder.fileCount} files</span>
                    </div>
                    {viewMode === "list" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Created {new Date(folder.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {viewMode === "list" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditModal(folder)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteFolder(folder)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Create Folder Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>Enter a name for your new folder.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFolder} disabled={!newFolderName.trim() || creating}>
                {creating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Folder"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Folder Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Rename Folder</DialogTitle>
              <DialogDescription>Enter a new name for "{editingFolder?.name}".</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEditFolder()}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditFolder} disabled={!newFolderName.trim() || updating}>
                {updating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Folder"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
