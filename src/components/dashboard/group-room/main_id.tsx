"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { ImageMessage, GroupDetails, Member } from "@/lib/types"
import { GroupDashboard } from "./group-dashboard"

export default function GroupRoomIdPage({ params }: { params: { id: string } }) {
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null)
  const [messages, setMessages] = useState<ImageMessage[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const groupCode = searchParams.get("code")

  // Get username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("grouproom_username")
    if (storedUsername) {
      setUsername(storedUsername)
    } else {
      router.push("/")
    }
  }, [router])

  // Redirect if no group code is provided
  useEffect(() => {
    if (!groupCode) {
      router.push("/")
    }
  }, [groupCode, router])

  // Fetch group details and messages
  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (!groupCode || !username) return

      try {
        const response = await fetch(`/api/groups?groupId=${params.id}&code=${groupCode}`)
        const data = await response.json()

        if (data.success) {
          // Check if we have a custom name in localStorage
          const savedGroups = JSON.parse(localStorage.getItem("grouproom_saved_groups") || "[]")
          const savedGroup = savedGroups.find((g: any) => g.id === params.id)

          setGroupDetails({
            ...data.group,
            username,
            // Use custom name if available
            name: savedGroup?.customName || data.group.name,
          })
          setMessages(data.messages)
          setMembers(data.members || [])
        } else {
          setError("Invalid group or access denied")
          setTimeout(() => router.push("/"), 3000)
        }
      } catch (error) {
        console.error("Failed to fetch group details:", error)
        setError("Failed to load group. Redirecting to home...")
        setTimeout(() => router.push("/"), 3000)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGroupDetails()

    // Set up polling for new messages
    const intervalId = setInterval(() => {
      fetchGroupDetails()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [params.id, groupCode, router, username])

  const handleImageUpload = async (file: File) => {
    if (!groupDetails || !username) return { success: false }

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("code", groupCode!)
      formData.append("username", username)

      const response = await fetch(`/api/groups/${params.id}/messages`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      if (result.success) {
        // Refresh messages
        const refreshResponse = await fetch(`/api/groups?groupId=${params.id}&code=${groupCode}`)
        const refreshData = await refreshResponse.json()
        if (refreshData.success) {
          setMessages(refreshData.messages)
          setMembers(refreshData.members || [])
        }
      }
      return result
    } catch (error) {
      console.error("Failed to send image:", error)
      return { success: false }
    }
  }

  // Save custom group name to localStorage
  const updateGroupName = (newName: string) => {
    if (!groupDetails) return

    // Update local state
    setGroupDetails({
      ...groupDetails,
      name: newName,
    })

    // Save to localStorage
    const savedGroups = JSON.parse(localStorage.getItem("grouproom_saved_groups") || "[]")
    const updatedGroups = savedGroups.map((group: any) => {
      if (group.id === params.id) {
        return {
          ...group,
          customName: newName,
        }
      }
      return group
    })

    localStorage.setItem("grouproom_saved_groups", JSON.stringify(updatedGroups))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading group...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <GroupDashboard
      groupDetails={groupDetails}
      messages={messages}
      members={members}
      username={username}
      groupCode={groupCode || ""}
      onImageUpload={handleImageUpload}
      onBack={() => router.push("/")}
    />
  )
}
