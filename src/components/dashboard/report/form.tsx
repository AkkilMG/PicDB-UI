"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Check, AlertCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveReport } from "@/lib/report"

interface FormData {
  report: string
  contact: string
  link: string
}

export default function EmailForm({data}: {data: any}) {
  const [formData, setFormData] = useState<FormData>({
    report: "",
    contact: "",
    link: ""
  })

  const [otherReason, setOtherReason] = useState<string>("")
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLinkValid, setIsLinkValid] = useState<boolean | null>(null)

  // List of report options
const reportOptions = [
    { value: "violent", label: data.options.violent },
    { value: "restricted", label: data.options.restricted },
    { value: "18+", label: data.options.adult },
    { value: "copyright", label: data.options.copyright },
    { value: "hate", label: data.options.hate },
    { value: "misinfo", label: data.options.misinfo },
    { value: "spam", label: data.options.spam },
    { value: "sensitive", label: data.options.sensitive },
    { value: "privacy", label: data.options.privacy },
    { value: "others", label: data.options.others }
]

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateLink = (link: string): boolean => {
    const urlRegex = /^https:\/\/picdb\.avianintek\.workers\.dev\/(d|download|v|view)\/[A-Za-z0-9]+$/
    return urlRegex.test(link)
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validate email on change
    if (name === "contact") {
      if (value === "") {
        setIsEmailValid(null)
      } else {
        setIsEmailValid(validateEmail(value))
      }
    }

    if (name === "link") {
      if (value === "") {
        setIsLinkValid(null)
      } else {
        setIsLinkValid(validateLink(value))
      }
    }

  }

  // Handle report selection
  const handleReportChange = (value: string) => {
    setFormData((prev) => ({ ...prev, report: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    if (!formData.report) {
      alert("Please select a report")
      return
    }

    if (!formData.contact || !isEmailValid) {
      alert("Please enter a valid contact email")
      return
    }

    if (!formData.link) {
      alert("Please enter a link")
      return
    }

    if (formData.report === "others" && !otherReason) {
      alert("Please specify the reason for reporting")
      return
    }

    if (formData.report === "others") {
        setFormData((prev) => ({ ...prev, report: otherReason }))
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setFormData({
        report: "",
        contact: "",
        link: ""
      })
      setIsEmailValid(null)

      var send = await saveReport({ ...formData })
      if (send.success) {
        alert("notification sent successfully!")
        window.location.href = "/dashboard";
      } else {
        alert("Failed to send notification. Please try again.")
      }

    } catch (error) {
      console.log("Error sending notification:", error)
      alert("Failed to send notification. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="shadow-lg bg-white border-slate-200 mt-2 xl:m-6">
      <form onSubmit={handleSubmit}>
        <CardHeader className="border-b rounded-t-lg">
          <h2 className="text-xl font-semibold text-slate-800">{data.form.title}</h2>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* report Dropdown */}
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-1">
              <Label htmlFor="report" className="text-sm font-medium">
                {data.form.type}
              </Label>
              <Select value={formData.report} onValueChange={handleReportChange}>
                <SelectTrigger id="report" className="w-full focus:ring-2 focus:ring-emerald-500">
                  <SelectValue placeholder="Select report" />
                </SelectTrigger>
                <SelectContent>
                  {reportOptions.map((option) => (
                    <SelectItem className="hover:bg-slate-50 bg-white border-none" key={option.value} value={option.value}>
                      {option.label} ({option.value})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.report === "others" && (
              <div className="flex-1 space-y-1">
                <Label htmlFor="otherReason" className="text-sm font-medium">
                  {data.form.reason}
                </Label>
                <input type="text" id="otherReason" value={otherReason} onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Describe the issue..." className="min-h-[38px] w-full rounded-md px-3 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>

          {/* contact Email with validation */}
          <div className="space-y-2">
            <Label htmlFor="contact" className="text-sm font-medium">
              {data.form.contact}
            </Label>
            <div className="relative">
              <Input id="contact" name="contact" type="email" value={formData.contact} 
                onChange={handleChange} placeholder="contact@example.com"
                className={`pr-10 ${
                  isLinkValid === false
                    ? "border-red-300 focus-visible:ring-red-500"
                    : isLinkValid === true
                      ? "border-green-300 focus-visible:ring-green-500"
                      : ""
                }`}
              />
              {isEmailValid !== null && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {isEmailValid ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {isEmailValid === false && <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>}
          </div>

          

          {/* link with validation */}
          <div className="space-y-2">
            <Label htmlFor="link" className="text-sm font-medium">
              {data.form.link}
            </Label>
            <div className="relative">
              <Input id="link" name="link" type="text" value={formData.link} 
                onChange={handleChange} placeholder="Enter the link to the content"
                className={`pr-10 ${
                  isEmailValid === false
                    ? "border-red-300 focus-visible:ring-red-500"
                    : isEmailValid === true
                      ? "border-green-300 focus-visible:ring-green-500"
                      : ""
                }`}
              />
              {isLinkValid !== null && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {isLinkValid ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {isLinkValid === false && <p className="text-sm text-red-500 mt-1">Please enter a valid link</p>}
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
                {data.form.reporting}
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {data.form.send}
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
