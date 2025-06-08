"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Check, Eye, EyeOff, Loader2, RefreshCw, Search, Star, Trash2, X } from "lucide-react"

interface Testimonial {
  _id: string
  logo: string
  logoColor: string
  rating: number
  quote: string
  name: string
  username: string
  location: string
  company: string
  submittedAt: string
  hidden: boolean
  reviewed: boolean
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/testimonials")
      const result = await response.json()

      if (result.success) {
        setTestimonials(result.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch testimonials",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const updateTestimonial = async (id: string, updates: Partial<Pick<Testimonial, "hidden" | "reviewed">>) => {
    try {
      setUpdatingIds((prev) => new Set(prev).add(id))

      const response = await fetch(`/api/testimonials`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...updates, _id: id}),
      })

      const result = await response.json()

      if (result.success) {
        setTestimonials((prev) =>
          prev.map((testimonial) => (testimonial._id === id ? { ...testimonial, ...updates } : testimonial)),
        )
        toast({
          title: "Success",
          description: "Testimonial updated successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update testimonial",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      })
    } finally {
      setUpdatingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial? This action cannot be undone.")) {
      return
    }

    try {
      setUpdatingIds((prev) => new Set(prev).add(id))
      const response = await fetch(`/api/testimonials`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"id": id}),
      })

      const result = await response.json()
      if (result.success) {
        setTestimonials((prev) => prev.filter((testimonial) => testimonial._id !== id))
        toast({
          title: "Success",
          description: "Testimonial deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete testimonial",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      })
    } finally {
      setUpdatingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const handleToggleHidden = (id: string, currentHidden: boolean) => {
    updateTestimonial(id, { hidden: !currentHidden })
  }

  const handleReviewAction = (id: string, action: "accept" | "reject") => {
    const updates = {
      reviewed: true,
      hidden: action === "reject",
    }
    updateTestimonial(id, updates)
  }

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "pending") return !testimonial.reviewed && matchesSearch
    if (activeTab === "approved") return testimonial.reviewed && !testimonial.hidden && matchesSearch
    if (activeTab === "hidden") return testimonial.hidden && matchesSearch
    return matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getStatusBadge = (testimonial: Testimonial) => {
    if (!testimonial.reviewed) {
      return (
        <Badge variant="outline" className="text-orange-600 border-orange-200">
          Pending Review
        </Badge>
      )
    }
    if (testimonial.hidden) {
      return <Badge variant="destructive">Hidden</Badge>
    }
    return (
      <Badge variant="default" className="bg-green-600">
        Approved
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading testimonials...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto pt-9 px-6 max-w-8xl h-screen">
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Testimonials Management</h1>
            <p className="text-muted-foreground mt-2">Manage and moderate customer testimonials</p>
          </div>
          <Button onClick={fetchTestimonials} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="mb-2">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search testimonials..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-1">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">All ({testimonials.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({testimonials.filter((t) => !t.reviewed).length})</TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({testimonials.filter((t) => t.reviewed && !t.hidden).length})
          </TabsTrigger>
          <TabsTrigger value="hidden">Hidden ({testimonials.filter((t) => t.hidden).length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-2">
          {filteredTestimonials.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No testimonials found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 overflow-x-auto w-full max-h-96 sm:max-h-[35rem] pr-2 overflow-y-auto scrollbar" style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto', }}>
              {filteredTestimonials.map((testimonial) => {
                const isUpdating = updatingIds.has(testimonial._id)

                return (
                  <Card key={testimonial._id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`text-2xl ${testimonial.logoColor}`}>{testimonial.logo}</div>
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              @{testimonial.username} • {testimonial.company}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.location} • {formatDate(testimonial.submittedAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">{getStatusBadge(testimonial)}</div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-1">
                        {renderStars(testimonial.rating)}
                        <span className="ml-2 text-sm text-muted-foreground">{testimonial.rating}/5</span>
                      </div>

                      <blockquote className="text-sm leading-relaxed border-l-4 border-muted pl-4 italic">
                        "{testimonial.quote}"
                      </blockquote>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Switch checked={!testimonial.hidden} disabled={isUpdating} id={`visibility-${testimonial._id}`}
                            onCheckedChange={() => handleToggleHidden(testimonial._id, testimonial.hidden)}/>
                            <label htmlFor={`visibility-${testimonial._id}`} className="text-sm font-medium flex items-center gap-1">
                              {testimonial.hidden ? (
                                <>
                                  <EyeOff className="h-4 w-4" />
                                  Hidden
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4" />
                                  Visible
                                </>
                              )}
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => deleteTestimonial(testimonial._id)}
                            disabled={isUpdating} className="text-red-600 border-red-200 hover:bg-red-50">
                            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </Button>

                          {!testimonial.reviewed && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => handleReviewAction(testimonial._id, "reject")}
                                disabled={isUpdating} className="text-red-600 border-red-200 hover:bg-red-50">
                                {isUpdating ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                ) : (
                                  <X className="h-4 w-4 mr-1" />
                                )}
                                Reject
                              </Button>
                              <Button size="sm" onClick={() => handleReviewAction(testimonial._id, "accept")} 
                                disabled={isUpdating} className="bg-green-600 hover:bg-green-700">
                                {isUpdating ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                ) : (
                                  <Check className="h-4 w-4 mr-1" />
                                )}
                                Accept
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
