export interface Folder {
  id: string
  name: string
  userId: string
  createdAt: string
  updatedAt: string
  parentId?: string
  fileCount: number
}

export async function createFolder(
  name: string,
  userId: string,
  parentId?: string,
): Promise<{ success: boolean; folder?: Folder; error?: string }> {
  try {
    const response = await fetch("/api/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, userId, parentId }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error creating folder:", error)
    return { success: false, error: "Failed to create folder" }
  }
}

export async function getFolders(
  userId: string,
  parentId?: string,
): Promise<{ success: boolean; folders?: Folder[]; error?: string }> {
  try {
    const params = new URLSearchParams({ userId })
    if (parentId) params.append("parentId", parentId)

    const response = await fetch(`/api/folders?${params}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching folders:", error)
    return { success: false, error: "Failed to fetch folders" }
  }
}

export async function updateFolder(
  folderId: string,
  name: string,
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/folders", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderId, name, userId }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error updating folder:", error)
    return { success: false, error: "Failed to update folder" }
  }
}

export async function deleteFolder(folderId: string, userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/folders?folderId=${folderId}&userId=${userId}`, {
      method: "DELETE",
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error deleting folder:", error)
    return { success: false, error: "Failed to delete folder" }
  }
}

export async function addFileToFolder(
  folderId: string,
  fileId: string,
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("/api/folders/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderId, fileId, userId }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error adding file to folder:", error)
    return { success: false, error: "Failed to add file to folder" }
  }
}

export async function removeFileFromFolder(
  folderId: string,
  fileId: string,
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/folders/files?folderId=${folderId}&fileId=${fileId}&userId=${userId}`, {
      method: "DELETE",
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error removing file from folder:", error)
    return { success: false, error: "Failed to remove file from folder" }
  }
}
