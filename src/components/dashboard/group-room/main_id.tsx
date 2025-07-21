"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { ImageMessage, GroupDetails, Member } from "@/lib/types"
import { GroupDashboard } from "./group-dashboard"
import { fetchGroups, fetchUsername, updateGroupName } from "@/lib/group"
import { enGroup, esGroup, ruGroup, hiGroup } from "@/config/text/group.text"

export default function GroupRoomIdPage({ params }: { params: Promise<any> }) {
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null)
  const [messages, setMessages] = useState<ImageMessage[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [uid, setUid] = useState("") 
  const [data, setData] = useState(enGroup)
  const router = useRouter()
  const searchParams = useSearchParams()
  const groupCode = searchParams.get("code")
  const [id, setId] = useState("")

  // Language configuration
  useEffect(() => {
    const checkLanguage = () => {
      const lang = localStorage.getItem("lang")
      if (lang === "es") {
        setData(esGroup)
      } else if (lang === "ru") {
        setData(ruGroup)
      } else if (lang === "hi") {
        setData(hiGroup)
      } else {
        setData(enGroup)
      }
    }

    checkLanguage()
    const intervalId = setInterval(checkLanguage, 2000)

    return () => clearInterval(intervalId)
  }, [])

  
  useEffect(() => {
    const fetchId = async () => {
      setId((await params)?.id)
    }
    fetchId()
  }, [params])

  // Get username from localStorage
  useEffect(() => {
    initializeUser()
  }, [router])

  
  const initializeUser = async () => {
    try {
      var temp = localStorage.getItem("uid");
      if (!temp) {
        router.push("/dashboard/group-room")
        return
      } 
      setUid(temp)
      const userData = await fetchUsername(temp)
      if (!userData.success) {
        router.push("/dashboard/group-room")
        return
      }
      setUsername(userData.data.name)
    } catch (error) {
      console.error("Error initializing user:", error)
      router.push("/dashboard/group-room")
    }
  }

  // Redirect if no group code is provided
  useEffect(() => {
    if (!groupCode) {
      router.push("/dashboard/group-room")
    }
  }, [groupCode, router])

  // Fetch group details and messages
  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (!groupCode || !username) return

      try {
        const response = await fetch(`/api/groups?groupId=${id}&code=${groupCode}&uid=${uid}`)
        const data = await response.json()
        if (data.success) {
          // Check if we have a custom name in localStorage
          const savedGroups = JSON.parse(localStorage.getItem("grouproom_saved_groups") || "[]")
          const savedGroup = savedGroups.find((g: any) => g.id === id)

          setGroupDetails({
            ...data.group,
            username,
            // Use custom name if available
            name: savedGroup?.customName || data.group.name,
          })
          setMessages(data.messages)
          setMembers(data.members || [])
        } else {
          setError(data.dashboard.invalidGroup)
          setTimeout(() => router.push("/dashboard/group-room"), 3000)
        }
      } catch (error) {
        console.error("Failed to fetch group details:", error)
        setError(data.dashboard.failedToLoad)
        setTimeout(() => router.push("/dashboard/group-room"), 3000)
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
  }, [id, groupCode, router, username])

  const handleImageUpload = async (file: File) => {
    if (!groupDetails || !username || !uid ) return { success: false }

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("code", groupCode!)
      formData.append("username", username)
      formData.append("uid", uid)
      formData.append("groupId", id)
      const response = await fetch(`/api/groups/messages`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      if (result.success) {
        // Refresh messages
        const refreshResponse = await fetch(`/api/groups?groupId=${id}&code=${groupCode}&uid=${uid}`)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-base sm:text-lg text-gray-600">{data.dashboard.loadingGroup}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <p className="text-red-500 text-base sm:text-lg break-words">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <GroupDashboard data={data} groupDetails={groupDetails} messages={messages} members={members} username={username}
      groupCode={groupCode || ""} onImageUpload={handleImageUpload} onBack={() => router.push("/dashboard/group-room")} />
  )
}

