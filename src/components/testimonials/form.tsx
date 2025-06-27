"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Check, Loader2, Sparkles, User, MapPin, Building2, Instagram, Palette } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StarRating } from "./star"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface TestimonialFormData {
  logo: string
  logoColor: string
  rating: number
  quote: string
  name: string
  username: string
  location: string
  company: string
}

const colorOptions = [
  { value: "text-blue-600", label: "Ocean Blue", color: "bg-blue-600" },
  { value: "text-red-600", label: "Crimson Red", color: "bg-red-600" },
  { value: "text-green-600", label: "Forest Green", color: "bg-green-600" },
  { value: "text-yellow-600", label: "Golden Yellow", color: "bg-yellow-600" },
  { value: "text-purple-600", label: "Royal Purple", color: "bg-purple-600" },
  { value: "text-pink-600", label: "Rose Pink", color: "bg-pink-600" },
  { value: "text-indigo-600", label: "Deep Indigo", color: "bg-indigo-600" },
  { value: "text-teal-600", label: "Teal", color: "bg-teal-600" },
]

export default function TestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showThankYou, setShowThankYou] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<TestimonialFormData>({
    defaultValues: {
      logo: "",
      logoColor: "text-blue-600",
      rating: 5,
      quote: "",
      name: "",
      username: "",
      location: "",
      company: "",
    },
  })

  const watchedRating = watch("rating")

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to submit testimonial")

      setSubmitSuccess(true)
      setShowThankYou(true)
      reset()

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nameProps = register("name", { required: "Name is required" })
  const locationProps = register("location", { required: "Location is required" })
  const companyProps = register("company")
  const usernameProps = register("username")
  const logoProps = register("logo")
  const quoteProps = register("quote", { required: "Your feedback is required" })

  return (
    <>
      <div className="space-y-8">
        {/* Success/Error Alerts */}
        <div className="space-y-4">
          {submitSuccess && (
            <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50 backdrop-blur-sm shadow-lg animate-in slide-in-from-top-2 duration-500">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-green-100 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <AlertDescription className="text-green-800 font-medium">
                  🎉 Thank you! Your testimonial has been submitted successfully.
                </AlertDescription>
              </div>
            </Alert>
          )}

          {submitError && (
            <Alert className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200/50 backdrop-blur-sm shadow-lg animate-in slide-in-from-top-2 duration-500">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-red-100 rounded-full">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <AlertDescription className="text-red-800 font-medium">{submitError}</AlertDescription>
              </div>
            </Alert>
          )}
        </div>

        {/* Main Form Card */}
        <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/5 transition-all duration-500 hover:shadow-3xl hover:shadow-black/10">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Rating Section */}
              <div className="text-center space-y-6 p-8 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl border border-white/30">
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  <Label className="text-lg font-semibold text-gray-800">Rate Your Experience</Label>
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </div>

                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => <StarRating rating={field.value} onRatingChange={field.onChange} />}
                />

                <div className="text-sm text-gray-600 font-medium">
                  {watchedRating === 5
                    ? "🌟 Outstanding!"
                    : watchedRating >= 4
                      ? "😊 Great!"
                      : watchedRating >= 3
                        ? "👍 Good!"
                        : watchedRating >= 2
                          ? "😐 Okay"
                          : "😞 Needs improvement"}
                </div>
              </div>

              {/* Feedback Section */}
              <div className="space-y-4">
                <Label htmlFor="quote" className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <div className="p-1 bg-blue-100 rounded-lg">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>Share Your Story</span>
                </Label>
                <Textarea
                  id="quote"
                  placeholder="Tell us about your experience... (max 150 chars)"
                  maxLength={150}
                  className={`min-h-[140px] bg-white/50 backdrop-blur-sm border-2 transition-all duration-300 resize-none text-gray-700 placeholder:text-gray-400 ${
                    focusedField === "quote"
                      ? "border-blue-400 shadow-lg shadow-blue-400/20 bg-white/80"
                      : "border-gray-200/50 hover:border-gray-300/70"
                  } ${errors.quote ? "border-red-400" : ""}`}
                  onFocus={() => setFocusedField("quote")}
                  {...quoteProps}
                  onBlur={(e) => {
                    setFocusedField(null)
                    quoteProps.onBlur(e)
                  }}
                />
                {/* <Controller
                  name="quote"
                  control={control}
                  rules={{ required: "Your feedback is required" }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="quote"
                      placeholder="Tell us about your experience... (max 150 chars)"
                      maxLength={150}
                      className={`...your styling...`}
                      onFocus={() => setFocusedField("quote")}
                      onBlur={(e) => {
                        setFocusedField(null)
                        field.onBlur()
                      }}
                    />
                  )}
                /> */}
                {errors.quote && <p className="text-sm text-red-500 mt-2">{errors.quote.message}</p>}
              </div>

              {/* Grid Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <InputWithLabel
                  id="name"
                  label="Your Name"
                  icon={<User />}
                  error={errors.name}
                  fieldProps={nameProps}
                  setFocusedField={setFocusedField}
                  focusedField={focusedField}
                />

                {/* Location */}
                <InputWithLabel
                  id="location"
                  label="Location"
                  icon={<MapPin />}
                  error={errors.location}
                  fieldProps={locationProps}
                  setFocusedField={setFocusedField}
                  focusedField={focusedField}
                />

                {/* Company */}
                <InputWithLabel
                  id="company"
                  label="Company (optional)"
                  icon={<Building2 />}
                  fieldProps={companyProps}
                  setFocusedField={setFocusedField}
                  focusedField={focusedField}
                />

                {/* Username */}
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-base font-medium text-gray-700 flex items-center space-x-2">
                    <Instagram className="h-4 w-4 text-gray-500" />
                    <span>
                      Instagram <span className="text-gray-400 text-sm">(optional)</span>
                    </span>
                  </Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-lg border-2 border-r-0 border-gray-200/50 bg-gray-50/50 text-gray-500 text-sm font-medium">
                      @
                    </span>
                    <Input
                      id="username"
                      className={`rounded-l-none bg-white/50 backdrop-blur-sm border-2 transition-all duration-300 ${
                        focusedField === "username"
                          ? "border-blue-400 shadow-lg shadow-blue-400/20 bg-white/80"
                          : "border-gray-200/50 hover:border-gray-300/70"
                      }`}
                      placeholder="username"
                      onFocus={() => setFocusedField("username")}
                      {...usernameProps}
                      onBlur={(e) => {
                        setFocusedField(null)
                        usernameProps.onBlur(e)
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Logo & Color */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/50 rounded-2xl border border-white/30">
                <InputWithLabel
                  id="logo"
                  label="Company Logo Name (optional)"
                  icon={<Sparkles />}
                  fieldProps={logoProps}
                  setFocusedField={setFocusedField}
                  focusedField={focusedField}
                />
                <div className="space-y-3">
                  <Label
                    htmlFor="logoColor"
                    className="text-base font-medium text-gray-700 flex items-center space-x-2"
                  >
                    <Palette className="h-4 w-4 text-gray-500" />
                    <span>Logo Color Theme</span>
                  </Label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((color) => (
                      <label key={color.value} className="cursor-pointer">
                        <input type="radio" value={color.value} className="sr-only" {...register("logoColor")} />
                        <div
                          className={`w-full h-12 ${color.color} rounded-lg border-2 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center
                          ${watch("logoColor") === color.value ? "border-black" : "border-white"}`}
                        >
                          <span className="text-white text-xs font-medium">{color.label.split(" ")[0]}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Submitting Your Story...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Sparkles className="h-5 w-5" />
                      <span>Share My Experience</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <AlertDialog open={showThankYou} onOpenChange={setShowThankYou}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-600">🎉 Thank you!</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              Thank you for sharing your experience with us.
              <br />
              <span className="mt-2 block text-sm text-gray-500">
                Your feedback will be reviewed and showcased on our homepage.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-green-50 border border-green-500 hover:bg-green-500 hover:text-white text-black transition-all duration-300 transform hover:scale-105"
              onClick={() => setShowThankYou(false)}
            >
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function InputWithLabel({ id, label, icon, error, fieldProps, setFocusedField, focusedField }: any) {
  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-base font-medium text-gray-700 flex items-center space-x-2">
        {icon}
        <span>{label}</span>
      </Label>
      <Input
        id={id}
        placeholder={label}
        className={`bg-white/50 backdrop-blur-sm border-2 transition-all duration-300 ${
          focusedField === id
            ? "border-blue-400 shadow-lg shadow-blue-400/20 bg-white/80"
            : "border-gray-200/50 hover:border-gray-300/70"
        } ${error ? "border-red-400" : ""}`}
        onFocus={() => setFocusedField(id)}
        onBlur={(e) => {
          setFocusedField(null)
          fieldProps.onBlur?.(e)
        }}
        {...fieldProps}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  )
}
