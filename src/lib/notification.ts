
export async function sendNotification(notifyData: any): Promise<any> {
    try {
      const response = await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notifyData),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error sending email:", error)
      return { success: false, message: "Error sending email" }
    }
}

export async function deleteNotification(id: any): Promise<any> {
    try {

      const response = await fetch("/api/notification", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: id }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error sending email:", error)
      return { success: false, message: "Error sending email" }
    }
}

export async function getNotification(): Promise<any> {
    try {
      const response = await fetch("/api/notification", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
  
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error sending email:", error)
      return { success: false, message: "Error sending email" }
    }
}
