
export async function saveReport(reportData: any): Promise<any> {
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reportData),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error sending email:", error)
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
        body: JSON.stringify({_id: reportData}),
      })  
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error sending email:", error)
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
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error sending email:", error)
      return { success: false, message: "Error sending email" }
    }
}
