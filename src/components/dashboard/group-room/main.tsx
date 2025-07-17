// "use client"

// import { useState, useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Plus, UserPlus } from "lucide-react"
// import { GroupsList } from "./groups-list"
// import { UsernameModal } from "./username-modal"
// import { CreateGroupModal } from "./pop/create-group"
// import { JoinGroupModal } from "./pop/join-group"
// import { createGroup, joinGroup } from "@/lib/group"
// import lottie from 'lottie-web';
// import createGroupData from '@/assets/create.json';
// import joinGroupData from '@/assets/join.json';

// interface SavedGroup {
//   _id?: string
//   uid?: string
//   name: string
//   code: string
//   password: string
//   joinedAt: string
//   lastActivity?: string
// }

// export default function GroupRoomPage() {
//   const [showCreateModal, setShowCreateModal] = useState(false)
//   const [showJoinModal, setShowJoinModal] = useState(false)
//   const [showUsernameModal, setShowUsernameModal] = useState(false)
//   const [username, setUsername] = useState("")
//   const [uid, setUid] = useState<string | null>(null)
//   const [savedGroups, setSavedGroups] = useState<SavedGroup[]>([])
//   const router = useRouter()

//   const createGroupRef = useRef(null);
//   const joinGroupRef = useRef(null);
//   useEffect(() => {
//     if (createGroupRef.current) {
//       const animation = lottie.loadAnimation({
//         container: createGroupRef.current,
//         renderer: 'svg', //  'canvas'
//         loop: true,
//         autoplay: true,
//         animationData: createGroupData, 
//       });
//       return () => animation.destroy(); 
//     }
//   }, [createGroupRef]);
//   useEffect(() => {
//     if (joinGroupRef.current) {
//       const animation = lottie.loadAnimation({
//         container: joinGroupRef.current,
//         renderer: 'svg', //  'canvas'
//         loop: true,
//         autoplay: true,
//         animationData: joinGroupData, 
//       });
//       return () => animation.destroy(); 
//     }
//   }, [joinGroupRef]);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username")
//     if (storedUsername) {
//       setUsername(storedUsername)
//     } else {
//       setShowUsernameModal(true)
//     }
//     const storedGroups = localStorage.getItem("grouproom_saved_groups")
//     if (storedGroups) {
//       try {
//         setSavedGroups(JSON.parse(storedGroups))
//       } catch (error) {
//         console.error("Error parsing saved groups:", error)
//         localStorage.removeItem("grouproom_saved_groups")
//       }
//     }
//   }, [])

//   async function setUsernameAPI(username: string) {
//     const response = await fetch("/api/auth/user", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({name: username}),
//     })
//     if (!response.ok) {
//       const error = await response.json()
//       console.log(error.error)
//       return null
//     }
//     var data = await response.json()
//     if (data && data.success) {
//       return data.id
//     }
//     return null
//   }

//   const handleUsernameSet = async (newUsername: string) => {
//     setUsername(newUsername)
//     const id = await setUsernameAPI(newUsername)
//     if (!id) {
//       console.error("Failed to set username")
//       return
//     }
//     setUid(id)
//     localStorage.setItem("uid", id)
//     localStorage.setItem("username", newUsername)
//     setShowUsernameModal(false)
//   }

//   const saveGroupToLocalStorage = (groupData: any) => {
//     const existingGroups = [...savedGroups]
//     const existingIndex = existingGroups.findIndex((g) => g.code === groupData.code)

//     if (existingIndex >= 0) {
//       existingGroups[existingIndex] = { ...existingGroups[existingIndex], ...groupData }
//     } else {
//       existingGroups.push(groupData)
//     }

//     setSavedGroups(existingGroups)
//     localStorage.setItem("grouproom_saved_groups", JSON.stringify(existingGroups))
//   }

//   const handleGroupJoined = async (groupId: string, groupCode: string, password: string, groupName?: string) => {
//     setShowJoinModal(false)

//     // Save group to localStorage
//     const groupData = {
//       id: groupId,
//       name: groupName || "Joined Group",
//       code: groupCode,
//       password: password,
//       joinedAt: new Date().toISOString(),
//       lastActivity: new Date().toISOString(),
//     }
//     var data = await joinGroup(groupData)
//     saveGroupToLocalStorage(groupData)

//     router.push(`/dashboard/group-room/${data.groupId}?code=${groupCode}`)
//   }

//   // const handleJoinSavedGroup = (group: SavedGroup) => {
//   //   // Update last activity
//   //   const updatedGroup = { ...group, lastActivity: new Date().toISOString() }
//   //   saveGroupToLocalStorage(updatedGroup)

//   //   router.push(`/dashboard/group-room/${group._id}?code=${group.code}`)
//   // }

//   const handleRemoveGroup = (groupCode: string) => {
//     const updatedGroups = savedGroups.filter((g) => g.code !== groupCode)
//     setSavedGroups(updatedGroups)
//     localStorage.setItem("grouproom_saved_groups", JSON.stringify(updatedGroups))
//   }

//   const changeUsername = () => {
//     setShowUsernameModal(true)
//   }

//   const clearAllGroups = () => {
//     setSavedGroups([])
//     localStorage.removeItem("grouproom_saved_groups")
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="border-b py-6 px-4">
//         <div className="container flex justify-end items-center">
//           {username && (
//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-600">
//           Welcome, <strong>{username}</strong>
//               </span>
//               <Button variant="ghost" size="sm" onClick={changeUsername}>
//           Change Name
//               </Button>
//               <div className="flex items-center gap-2 ml-4">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setShowCreateModal(true)}
//             className="flex items-center gap-2"
//           >
//             <Plus className="h-4 w-4" />
//             Create
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setShowJoinModal(true)}
//             className="flex items-center gap-2"
//           >
//             <UserPlus className="h-4 w-4" />
//             Join
//           </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       <main className="flex-1 container py-12 mx-12">
//         {savedGroups.length > 0 ? (
//           // Show groups list if user has saved groups
//           <div className="max-w-7xl mx-auto">
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold">Your Groups</h2>
//                 <p className="text-gray-600">Click on any group to continue sharing images</p>
//               </div>
//               <Button variant="ghost" size="sm" onClick={clearAllGroups} className="text-red-500 hover:text-red-700">
//                 Clear All
//               </Button>
//             </div>

//             <GroupsList groups={savedGroups} onRemoveGroup={handleRemoveGroup} />
//           </div>
//         ) : (
//           // Show welcome UI if no saved groups
//           <div className="max-w-3xl mx-auto text-center space-y-6">
//             <h2 className="text-4xl font-bold tracking-tight">Share Images in Private Groups</h2>
//             <p className="text-lg text-gray-600">
//               Create a secure private group with code and password, then share images with your friends.
//             </p>

//             <div className="grid md:grid-cols-2 gap-6 mt-12">
//               <Card className="text-center hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <CardTitle className="text-2xl">Create a Group</CardTitle>
//                   <CardDescription>Start a new secure image sharing group</CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex justify-center">
//                   {/* <img
//                     src="/placeholder.svg?height=120&width=120"
//                     alt="Create group illustration"
//                     className="h-32 w-32"
//                   /> */}
//                   <div ref={createGroupRef} className="h-32 w-32" /> 
//                 </CardContent>
//                 <CardFooter className="flex justify-center">
//                   <Button size="lg" onClick={() => setShowCreateModal(true)} disabled={!username}>
//                     Create Group
//                   </Button>
//                 </CardFooter>
//               </Card>

//               <Card className="text-center hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <CardTitle className="text-2xl">Join a Group</CardTitle>
//                   <CardDescription>Enter code and password to join an existing group</CardDescription>
//                 </CardHeader>
//                 <CardContent className="flex justify-center">
//                   {/* <img
//                     src="/placeholder.svg?height=120&width=120"
//                     alt="Join group illustration"
//                     className="h-32 w-32"
//                   /> */}
//                   <div ref={joinGroupRef} className="h-32 w-32" /> 
//                 </CardContent>
//                 <CardFooter className="flex justify-center">
//                   <Button size="lg" variant="outline" onClick={() => setShowJoinModal(true)} disabled={!username}>
//                     Join Group
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </div>
//           </div>
//         )}
//       </main>

//       <UsernameModal open={showUsernameModal} onUsernameSet={handleUsernameSet} />

//       <CreateGroupModal
//         open={showCreateModal}
//         onOpenChange={setShowCreateModal}
//         username={username}
//       />

//       <JoinGroupModal
//         open={showJoinModal}
//         onOpenChange={setShowJoinModal}
//         onSuccess={handleGroupJoined}
//         username={username}
//       />
//     </div>
//   )
// }


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
  const router = useRouter()

  const createGroupRef = useRef(null)
  const joinGroupRef = useRef(null)

  useEffect(() => {
    if (createGroupRef.current) {
      const animation = lottie.loadAnimation({
        container: createGroupRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: createGroupData,
      })
      return () => animation.destroy()
    }
  }, [createGroupRef])

  useEffect(() => {
    if (joinGroupRef.current) {
      const animation = lottie.loadAnimation({
        container: joinGroupRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: joinGroupData,
      })
      return () => animation.destroy()
    }
  }, [joinGroupRef])

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-6 px-4">
        <div className="container flex justify-end items-center">
          {username && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Welcome, <strong>{username}</strong>
              </span>
              <Button variant="ghost" size="sm" onClick={changeUsername}>
                Change Name
              </Button>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowJoinModal(true)}
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Join
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 container py-12 mx-12">
        {savedGroups.length > 0 ? (
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Your Groups</h2>
                <p className="text-gray-600">Click on any group to continue sharing images</p>
              </div>
            </div>

            <GroupsList groups={savedGroups} onRemoveGroup={handleRemoveGroup} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold tracking-tight">Share Images in Private Groups</h2>
            <p className="text-lg text-gray-600">
              Create a secure private group with code and password, then share images with your friends.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Create a Group</CardTitle>
                  <CardDescription>Start a new secure image sharing group</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div ref={createGroupRef} className="h-32 w-32" />
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button size="lg" onClick={() => setShowCreateModal(true)} disabled={!username}>
                    Create Group
                  </Button>
                </CardFooter>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Join a Group</CardTitle>
                  <CardDescription>Enter code and password to join an existing group</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div ref={joinGroupRef} className="h-32 w-32" />
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button size="lg" variant="outline" onClick={() => setShowJoinModal(true)} disabled={!username}>
                    Join Group
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      <UsernameModal open={showUsernameModal} onUsernameSet={handleUsernameSet} />

      <CreateGroupModal open={showCreateModal} onOpenChange={setShowCreateModal} username={username} />

      <JoinGroupModal
        open={showJoinModal}
        onOpenChange={setShowJoinModal}
        onSuccess={handleGroupJoined}
        username={username}
      />
    </div>
  )
}
