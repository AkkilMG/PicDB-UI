"use client"

import type React from "react"

import { useState } from "react"
import { Check, AlertCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TOKEN_AUTH_IDENTITY } from "@/config/env.config"
import { saveReport } from "@/lib/report"

interface FormData {
  title: string
  body: string
}

export default function EmailForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    body: ""
  })
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)


  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    if (!formData.title) {
      alert("Please enter the title")
      return
    }

    if (!formData.body) {
      alert("Please enter the body")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setFormData({
        title: "",
        body: ""
      })
      setIsEmailValid(null)

      var send = await sendNotification({ ...formData })
      if (send.success) {
        alert("Message sent successfully!")
        window.location.href = "/dashboard";
      } else {
        alert("Failed to send message. Please try again.")
      }

    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-lg bg-white border-slate-200 m-6">
      <form onSubmit={handleSubmit}>
        <CardHeader className="border-b rounded-t-lg">
          <h2 className="text-xl font-semibold text-slate-800">Report Now!</h2>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter message title"
            />
          </div>
          {/* link */}
          <div className="space-y-2">
            <Label htmlFor="body" className="text-sm font-medium">
              Body
            </Label>
            <Input
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Enter message body"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t p-6 text-lg rounded-b-lg">
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white p-4" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Reporting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
