"use client"

import { useEffect, useState } from "react"
import type { ImageMessage, GroupDetails, Member } from "@/lib/types"
import { GroupHeader } from "./group-header"
import { GroupImageList } from "./group-image-list"
import { GroupUploader } from "./group-uploader"
import { GroupInfo } from "./group-statistics"
import { ImageModal } from "./image-modal"
import { updateGroupName } from "@/lib/group"

interface GroupDashboardProps {
  groupDetails: GroupDetails | null
  messages: ImageMessage[]
  members: Member[]
  username: string
  groupCode: string
  onImageUpload: (file: File) => Promise<any>
  onBack: () => void
}

export function GroupDashboard({
  groupDetails,
  messages,
  members,
  username,
  groupCode,
  onImageUpload,
  onBack,
}: GroupDashboardProps) {
  const [selectedImage, setSelectedImage] = useState<ImageMessage | null>(null)
  const [filteredMessages, setFilteredMessages] = useState<ImageMessage[]>(messages)
  const [showUploader, setShowUploader] = useState(false)
  const [groupName, setGroupName] = useState(groupDetails?.name || "Group Room")

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredMessages(messages)
    } else {
      const filtered = messages.filter(
        (message) =>
          message.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.username.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredMessages(filtered)
    }
  }

  const handleImageUpload = async (file: File) => {
    const result = await onImageUpload(file)
    if (result.success) {
      setShowUploader(false)
    }
    return result
  }

  console.log(groupDetails)

  const handleUpdateGroupName = async(newName: string) => {
    setGroupName(newName)
    var data = await updateGroupName(groupDetails?.id, newName)
    if (!data.success) {
      console.error("Failed to update group name:", data.error)
      // Optionally revert the name change in UI
      setGroupName(groupDetails?.name || "Group Room")
    }
  }

  // Update filtered messages when messages change
  useEffect(() => {
    setFilteredMessages(messages)
  }, [messages])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <GroupHeader groupDetails={{ ...(groupDetails || {}), name: groupName }} messageCount={messages.length}
            groupCode={groupCode} onBack={onBack} onSearch={handleSearch} onUploadClick={() => setShowUploader(true)}/>

          {/* Upload Section */}
          {showUploader && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
                <GroupUploader onUpload={handleImageUpload} username={username} onClose={() => setShowUploader(false)} />
              </div>
            </div>
          )}

          {/* Images List */}
          <div className="flex-1 p-4 lg:p-8">
            <GroupImageList messages={filteredMessages} username={username} onImageClick={setSelectedImage}
              onImageDelete={() => { {/*Refresh would happen through polling*/} }} />
          </div>
        </main>

        {/* Group Info Sidebar - Hidden on mobile */}
        <aside className="hidden lg:block lg:w-80 bg-white border-l">
          <GroupInfo groupDetails={{ ...(groupDetails || {}), name: groupName }} members={members} 
            onUpdateGroupName={handleUpdateGroupName} />
        </aside>
      </div>

      {/* Image Modal */}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  )
}
