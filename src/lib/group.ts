
export async function createGroup(groupData: any): Promise<any> {
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(groupData),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error sending email:", error)
      return { success: false, message: "Error sending email" }
    }
}


export async function joinGroup(groupData: any): Promise<any> {
    try {
      const response = await fetch("/api/groups", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(groupData),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error sending email:", error)
      return { success: false, message: "Error sending email" }
    }
}


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

