
// export async function createGroup(groupData: any): Promise<any> {
//     try {
//       const response = await fetch("/api/groups", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(groupData),
//       })
//       const data = await response.json()
//       return data
//     } catch (error) {
//       console.log("Error sending email:", error)
//       return { success: false, message: "Error sending email" }
//     }
// }


// export async function joinGroup(groupData: any): Promise<any> {
//     try {
//       const response = await fetch("/api/groups", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(groupData),
//       })
//       const data = await response.json()
//       return data
//     } catch (error) {
//       console.log("Error sending email:", error)
//       return { success: false, message: "Error sending email" }
//     }
// }


// export async function updateGroupName(groupId: any, name: any): Promise<any> {
//     try {
//       const response = await fetch("/api/groups/name", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ groupId, name }),
//       })
//       const data = await response.json()
//       return data
//     } catch (error) {
//       console.log("Error sending email:", error)
//       return { success: false, message: "Error sending email" }
//     }
// }



export async function createGroup(groupData: any): Promise<any> {
  try {
    const response = await fetch("/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupData),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error creating group:", error)
    return { success: false, message: "Error creating group" }
  }
}

export async function joinGroup(groupData: any): Promise<any> {
  try {
    const response = await fetch("/api/groups", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupData),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error joining group:", error)
    return { success: false, message: "Error joining group" }
  }
}

export async function getGroupDetails(groupId: string, code: string, uid: string): Promise<any> {
  try {
    const response = await fetch(`/api/groups?groupId=${groupId}&code=${code}&uid=${uid}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error fetching group details:", error)
    return { success: false, message: "Error fetching group details" }
  }
}

export async function getUserGroups(userId: string): Promise<any> {
  try {
    const response = await fetch(`/api/groups/user?userId=${userId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error fetching user groups:", error)
    return { success: false, message: "Error fetching user groups" }
  }
}

export async function updateGroupName(groupId: any, name: any): Promise<any> {
  try {
    const response = await fetch("/api/groups/name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupId, name }),
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error updating group name:", error)
    return { success: false, message: "Error updating group name" }
  }
}

export async function fetchUsername(uid: any): Promise<any> {
  try {
    const response = await fetch(`/api/groups/name?uid=${uid}`, {
      method: "GET",
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error updating group name:", error)
    return { success: false, message: "Error updating group name" }
  }
}

export async function fetchGroups(uid: any) {
  try {
    const response = await fetch(`/api/groups/info?uid=${uid}`, {
      method: "GET",
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log("Error updating group name:", error)
    return { success: false, message: "Error updating group name" }
  }
}