
export async function sendNotification(notifyData: any): Promise<any> {
    try {
      const response = await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notifyData),
      })
  
      if (!response.ok) {
        console.log("Failed to send email")
        return { success: false, message: "Failed to send email" }
      }
  
      const data = await response.json()
      return { success: true, data: data.data }
    } catch (error) {
      console.error("Error sending email:", error)
      return { success: false, message: "Error sending email" }
    }
}

export async function deleteNotification(notifyData: any): Promise<any> {
    try {

      const response = await fetch("/api/notification", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(notifyData),
      })
  
      if (!response.ok) {
        console.log("Failed to send email")
        return { success: false, message: "Failed to send email" }
      }
  
      const data = await response.json()
      return { success: true, data: data.data }
    } catch (error) {
      console.error("Error sending email:", error)
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
  
      if (!response.ok) {
        console.log("Failed to send email")
        return { success: false, message: "Failed to send email" }
      }
  
      const data = await response.json()
      return { success: true, data: data.notifications }
    } catch (error) {
      console.error("Error sending email:", error)
      return { success: false, message: "Error sending email" }
    }
}
