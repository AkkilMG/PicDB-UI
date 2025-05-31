
export async function saveReport(reportData: any): Promise<any> {
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reportData),
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

export async function closeReport(reportData: any): Promise<any> {
    try {

      const response = await fetch("/api/report", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reportData),
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

export async function getReport(): Promise<any> {
    try {
      const response = await fetch("/api/report", {
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
      return { success: true, data: data.reports }
    } catch (error) {
      console.error("Error sending email:", error)
      return { success: false, message: "Error sending email" }
    }
}
