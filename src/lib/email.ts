// import {  } from "@/config/env.config"

export async function fetchEmails(): Promise<any> {
    try {
      const response = await fetch("/api/email/details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      if (!response.ok) {
        console.log("Failed to fetch email details")
        return { success: false, message: "Failed to fetch email details" }
      }
  
      const data = await response.json()
      return {success: true, data: data.data}
    } catch (error) {
      console.error("Error fetching emails:", error)
      return { success: false, message: "Error fetching emails" }
    }
}
  

export async function saveEmail(emailData: any): Promise<any> {
    try {
      // console.log(process.env.TOKEN_AUTH_IDENTITY, config.TOKEN_AUTH_IDENTITY)
      // emailData = {
      //   ...emailData,
      //   identity: `Bearer ${process.env.TOKEN_AUTH_IDENTITY}`,
      // }
      console.log("emailData", emailData)
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
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