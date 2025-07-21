"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, UserPlus } from "lucide-react"
import { GroupsList } from "./groups-list"
import { UsernameModal } from "./username-modal"
import { CreateGroupModal } from "./pop/create-group"
import { JoinGroupModal } from "./pop/join-group"
import lottie from "lottie-web"
import createGroupData from "@/assets/create.json"
import joinGroupData from "@/assets/join.json"
import { fetchGroups, fetchUsername } from "@/lib/group"
import { enGroup, esGroup, ruGroup, hiGroup } from "@/config/text/group.text"

interface SavedGroup {
  id: string
  name: string
  code: string
  password: string
  joinedAt: string
  lastActivity?: string
}

export default function GroupRoomPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [username, setUsername] = useState("")
  const [uid, setUid] = useState<string | null>(null)
  const [savedGroups, setSavedGroups] = useState<SavedGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(enGroup)
  const router = useRouter()

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

  const createGroupRef = useRef(null);
  const joinGroupRef = useRef(null);

  // Helper to repeatedly check for ref and run animation when available
  useEffect(() => {
    let animation: any = null;
    let intervalId: NodeJS.Timeout | null = null;

    const tryLoad = () => {
      if (createGroupRef.current && !animation) {
        animation = lottie.loadAnimation({
          container: createGroupRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: createGroupData,
        });
        if (intervalId) clearInterval(intervalId);
      }
    };

    tryLoad();
    if (!animation) {
      intervalId = setInterval(tryLoad, 100);
    }

    return () => {
      if (animation) animation.destroy();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let animation: any = null;
    let intervalId: NodeJS.Timeout | null = null;

    const tryLoad = () => {
      if (joinGroupRef.current && !animation) {
        animation = lottie.loadAnimation({
          container: joinGroupRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: joinGroupData,
        });
        if (intervalId) clearInterval(intervalId);
      }
    };

    tryLoad();
    if (!animation) {
      intervalId = setInterval(tryLoad, 100);
    }

    return () => {
      if (animation) animation.destroy();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    initializeUser()
  }, [])

  useEffect(() => {
    if (uid) {
      fetchUserGroups()
      const interval = setInterval(() => {
        fetchUserGroups()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [uid])

  const initializeUser = async () => {
    try {
      var temp = localStorage.getItem("uid");
      if (!temp) {
        setShowUsernameModal(true)
        return
      } 
      setUid(temp)
      const userData = await fetchUsername(temp)
      if (!userData.success) {
        setShowUsernameModal(true)
        return
      }
      setUsername(userData.data.name)
    } catch (error) {
      console.error("Error initializing user:", error)
      setShowUsernameModal(true)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserGroups = async () => {
    try {
      const data = await fetchGroups(uid);
      if (data.success) {
        setSavedGroups(data.groups || [])
      } else setSavedGroups([])
    } catch (error) {
      console.error("Error fetching user groups:", error)
    }
  }

  async function setUsernameAPI(username: string) {
    const response = await fetch("/api/auth/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name: username}),
    })
    if (!response.ok) {
      const error = await response.json()
      console.log(error.error)
      return null
    }
    var data = await response.json()
    if (data && data.success) {
      return data.id
    }
    return null
  }
  
  const handleUsernameSet = async (newUsername: string) => {
    setUsername(newUsername)
    const id = await setUsernameAPI(newUsername)
    if (!id) {
      console.error("Failed to set username")
      return
    }
    setUid(id)
    localStorage.setItem("uid", id)
    setShowUsernameModal(false)
    await fetchUserGroups()
  }

  const handleGroupJoined = async (groupId: string, groupCode: string, password: string, groupName?: string) => {
    setShowJoinModal(false)

    // Refresh user groups
    if (uid) {
      await fetchUserGroups()
    }

    router.push(`/dashboard/group-room/${groupId}?code=${groupCode}`)
  }

  const handleRemoveGroup = async (groupCode: string) => {
    // This would typically call an API to remove the user from the group
    setSavedGroups((prev) => prev.filter((g) => g.code !== groupCode))
  }

  const changeUsername = () => {
    setShowUsernameModal(true)
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-base sm:text-lg text-gray-600">{data.main.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4 sm:py-6 px-4">
        <div className="container mx-auto">
          {username && (
            <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 sm:gap-4">
              {/* Welcome message - stack on mobile, inline on larger screens */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-sm text-gray-600 text-center sm:text-left">
                  {data.main.welcome[0]} <strong>{username}</strong>
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={changeUsername}
                  className="w-full sm:w-auto"
                >
                  {data.main.welcome[1]}
                </Button>
              </div>
              
              {/* Action buttons - stack on mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 sm:ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sm:inline">{data.actions.create}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowJoinModal(true)}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="sm:inline">{data.actions.join}</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 container py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {savedGroups.length > 0 ? (
          <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold">{data.groups.title}</h2>
                <p className="text-sm sm:text-base text-gray-600">{data.groups.subtitle}</p>
              </div>
            </div>

            <GroupsList data={data} groups={savedGroups} onRemoveGroup={handleRemoveGroup} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center space-y-6 px-4">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">{data.main.title}</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                {data.main.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl">{data.cards.create.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{data.cards.create.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <div ref={createGroupRef} className="h-24 w-24 sm:h-32 sm:w-32" />
                </CardContent>
                <CardFooter className="flex justify-center pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => setShowCreateModal(true)} 
                    disabled={!username}
                    className="w-full sm:w-auto"
                  >
                    {data.cards.create.button}
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl">{data.cards.join.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{data.cards.join.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <div ref={joinGroupRef} className="h-24 w-24 sm:h-32 sm:w-32" />
                </CardContent>
                <CardFooter className="flex justify-center pt-4">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => setShowJoinModal(true)} 
                    disabled={!username}
                    className="w-full sm:w-auto"
                  >
                    {data.cards.join.button}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      <UsernameModal data={data} open={showUsernameModal} onUsernameSet={handleUsernameSet} />

      <CreateGroupModal data={data} open={showCreateModal} onOpenChange={setShowCreateModal} username={username} />

      <JoinGroupModal data={data}
        open={showJoinModal}
        onOpenChange={setShowJoinModal}
        onSuccess={handleGroupJoined}
        username={username}
      />
    </div>
  )
}
