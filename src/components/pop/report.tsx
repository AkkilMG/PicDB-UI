"use client"

import type React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Flag } from "lucide-react"
import { useEffect, useState } from "react"

interface ReportData {
  contact: string
  reason: string
  link: string
}

interface ReportPopupProps {
  isOpen: boolean
  onClose: () => void
  data: any
  closeReportById: any
}

export default function ReportPopup({ isOpen, onClose, data, closeReportById }: ReportPopupProps) {
  const [id, setId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  useEffect(() => {
     if (data.link.includes("/v/")) {
      setId(data.link.split("/v/")[1].replace("/", ""));
    } else if (data.link.includes("/view/")) {
      setId(data.link.split("/view/")[1].replace("/", ""));
    }
  }, [id, data.link]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-500" />
            Report Details
          </DialogTitle>
          <DialogDescription>The below is the details on the report.</DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Input
              id="contact"
              type="email"
              value={data.contact}
              readOnly={true}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="report">Report Reason</Label>
            <Input
              id="report"
              type="text"
              value={data.report}
              readOnly={true}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="link"
              className="cursor-pointer select-none flex items-center gap-2"
              onClick={() => {
              if (id) {
                navigator.clipboard.writeText(id);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }
              }}
              title="Click to copy ID"
            >
              ID: {id}
              {copied && (
              <span className="text-green-600" aria-label="Copied">
                &#10003;
              </span>
              )}
            </Label>
            <img src={data.link} alt="Report Image" width={250} className="w-full h-auto rounded-md object-cover"/>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={(e) => closeReportById(data._id)} className="flex bg-red-50 border border-red-500 text-red-500 items-center gap-2">
              <X className="w-4 h-4" />
              Close Report
            </Button>
            <Button type="button" variant="outline" onClick={(e) => onClose()} className="flex bg-blue-50 border border-blue-500 text-blue-500  items-center gap-2">
              <X className="w-4 h-4" />
              Close Pop
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
