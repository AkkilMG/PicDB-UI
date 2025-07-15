"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Send, MessageCircle } from "lucide-react"
import { VscRefresh } from "react-icons/vsc";
import { useChat } from "ai/react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  buttons?: Array<{ text: string; action: string }>
}

const predefinedQuestions = [
  "What is picdb?",
  "Why is it free?",
  "How to get started with picdb?",
  "How to upload?",
  "How to navigate to the upload?",
  "How to download?",
  "How to use group room feature?",
]

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [localMessages, setLocalMessages] = useState<Message[]>([])
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chatbot",
    onFinish: () => {
      scrollToBottom()
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [localMessages, messages])

  useEffect(() => {
    if (open && showWelcome) {
      // Add welcome messages when chat opens
      const welcomeMessage: Message = {
        id: "welcome-1",
        role: "assistant",
        content: "Hello! Welcome to chat",
        timestamp: new Date(),
      }

      const helpMessage: Message = {
        id: "welcome-2",
        role: "assistant",
        content: "How can I help you?",
        timestamp: new Date(),
        buttons: predefinedQuestions.map((q) => ({ text: q, action: q })),
      }

      setTimeout(() => {
        setLocalMessages([welcomeMessage])
        setTimeout(() => {
          setLocalMessages((prev) => [...prev, helpMessage])
        }, 1000)
      }, 500)

      setShowWelcome(false)
    }
  }, [open, showWelcome])

  const handleQuestionClick = (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
      timestamp: new Date(),
    }

    let botResponse: Message

    // Provide specific responses for certain questions
    if (question === "What is picdb?") {
      botResponse = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content:
          "PicDB is a free, safe and secured image database and management platform. It doesn't require any login and allows you to upload, organize, and share images easily. You can also use group rooms for collaborative image sharing!",
        timestamp: new Date(),
      }
    } else if (question === "Why is it free?") {
      botResponse = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content:
          "PicDB is currently free because the application is in beta and demo phase, not yet completed. Once we finish development, we'll offer higher limits and an authenticated website with paid plans, while keeping the freemium version free with the same current limits.",
        timestamp: new Date(),
      }
    } else {
      // For other questions, redirect to docs
      var action = "docs";
      if (question === "How to get started with picdb?") action = "docs_getting_started"
      else if (question === "How to upload?") action = "docs_how_to_upload"
      else if (question === "How to navigate to the upload?") action = "docs_navigation_guide"
      else if (question === "How to download?") action = "docs_how_to_download"
      else if (question === "How to use group room feature?") action = "docs_group_rooms"
      
      botResponse = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: "Please find the documentation which would help you out by clicking 'Go to docs'",
        timestamp: new Date(),
        buttons: [{ text: "Go to docs", action}],
      }
    }

    setLocalMessages((prev) => [...prev, userMessage, botResponse])
  }

  const handleButtonClick = (action: string) => {
    if (action === "docs") {
      window.location.href = "/docs"
    } else if (action === "docs_getting_started") {
      window.location.href = "/docs/getting-started"
    } else if (action === "docs_how_to_upload") {
      window.location.href = "/docs/how-to-upload"
    } else if (action === "docs_how_to_download") {
      window.location.href = "/docs/how-to-download"
    } else if (action === "docs_navigation_guide") {
      window.location.href = "/docs/navigation-guide"
    } else if (action === "docs_group_rooms") {
      window.location.href = "/docs/group-rooms"
    }
  }

  const resetChat = () => {
    setLocalMessages([])
    setShowWelcome(true)
  }

  return (
    <div className="fixed bottom-10 right-6 z-50">
      {/* Chat Icon */}
      {!open && (
        <div className="cursor-pointer transition-transform hover:scale-110" onClick={() => setOpen(true)}>
          <div className="relative">
            <img
              src="/assets/icons/Etherea.webp"
              alt="Chat Support"
              className="w-16 h-16 shadow-lg"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Chat Box */}
      {open && (
        <Card className="w-80 h-116 shadow-2xl border-0 animate-in slide-in-from-bottom-5 duration-300 pt-0">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <CardTitle className="text-lg">Etherea</CardTitle>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={resetChat} className="text-white hover:bg-white/20 p-1 h-8 w-8">
                  {/* ↻ */}
                  <VscRefresh className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setOpen(false)} className="text-white hover:bg-white/20 p-1 h-8 w-8">
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Local Messages (Welcome + Predefined) */}
              {localMessages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"
                    } animate-in slide-in-from-bottom-2 duration-300`}>
                    <p className="text-sm">{message.content}</p>
                    {message.buttons && (
                      <div className="mt-3 space-y-1">
                        {message.buttons.map((button, idx) => (
                          <Button key={idx} variant="outline" size="sm" className="w-full text-xs h-8 bg-white hover:bg-gray-50"
                            onClick={() => {
                            if (button.action.includes("docs")) {  handleButtonClick(button.action)
                            } else { handleQuestionClick(button.action) }
                            }}>
                            {button.text}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* AI Messages */}
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-1 text-sm"
                  disabled={isLoading}
                />
                <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
