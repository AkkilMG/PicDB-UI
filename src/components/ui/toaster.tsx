"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { Lightbulb, SquareCheckBig } from "lucide-react"
import { act } from "react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        console.log("Rendering toast with id:", id, "title:", title, "description:", description, "action:", action)
        return (
          <Toast key={id} {...props}>
            <div className={`grid gap-1 p-4 rounded-xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {action ? (
                    <span className="text-red-500 flex items-center">
                      <Lightbulb className="h-9 w-9 mr-2" />
                    </span>
                  ) : (
                    <span className="text-green-500 flex items-center">
                      <SquareCheckBig className="h-9 w-9 mr-2" />
                    </span>
                  )}
                </div>
                {/* Right: Title and Description */}
                <div className="flex-1 min-w-0 ml-3">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}