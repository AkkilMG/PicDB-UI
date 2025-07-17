"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { FolderIcon, Plus, MoreHorizontal, Edit, Trash2, FileText, Loader2 } from "lucide-react"
import { createFolder, getFolders, updateFolder, deleteFolder, type Folder } from "@/lib/folder"

interface FoldersProps {
  userId: string
  parentId?: string
}

export default function MainDashboardFolders({ userId, parentId }: FoldersProps) {
  const [folders, setFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [newFolderName, setNewFolderName] = useState("")
  const [creating, setCreating] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    loadFolders()
  }, [userId, parentId])

  const loadFolders = async () => {
    setLoading(true)
    try {
      const result = await getFolders(userId, parentId)
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
      const result = await createFolder(newFolderName.trim(), userId, parentId)
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

  if (loading) {
    return (
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">Folders</h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading folders...</span>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">Folders</h2>
          <Button onClick={() => setShowCreateModal(true)} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Folder
          </Button>
        </div>

        {folders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FolderIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No folders yet. Create your first folder to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between mb-2">
                  <FolderIcon className="h-8 w-8 text-blue-500" />
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
                </div>
                <h3 className="font-medium text-gray-800 truncate" title={folder.name}>
                  {folder.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <FileText className="h-3 w-3" />
                  <span>{folder.fileCount} files</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Create Folder Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
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
        <DialogContent>
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
    </>
  )
}
