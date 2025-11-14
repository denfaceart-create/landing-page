"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"
import { Label } from "./ui/label"

interface ContactProps {
  lang: Language
}

export function Contact({ lang }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Merci!")
    setFormData({ name: "", email: "", phone: "", message: "" })

    // Simulate form submission
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {getTranslation(lang, "contactTitle")}
          </h2>
          <p className="text-lg text-muted-foreground mt-4">{getTranslation(lang, "contactSubtitle")}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

          <Card className=" p-8">
            <CardHeader>
              <CardTitle className="text-2xl">{getTranslation(lang, "contactTitle")}</CardTitle>
              <CardDescription>{getTranslation(lang, "contactSubtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{getTranslation(lang, "name")}</Label>
                    <Input
                      id="name"
                      placeholder={getTranslation(lang, "name")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{getTranslation(lang, "email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={getTranslation(lang, "email")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{getTranslation(lang, "phone")}</Label>

                  <Input
                    id="phone"
                    type="tel"
                    placeholder={getTranslation(lang, "phone")}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{getTranslation(lang, "message")}</Label>

                  <Textarea
                    id="message"
                    placeholder={"Tell us about your event..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="resize-none"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : getTranslation(lang, "send")}
                </Button>
              </form>
            </CardContent>
          </Card>


          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{getTranslation(lang, "email")}</div>
                    <a
                      href="mailto:faceartow@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      faceartow@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <a href="tel:+41796736445" className="text-muted-foreground hover:text-accent transition-colors">
                      079 673 64 45
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Location</div>
                    <p className="text-muted-foreground">
                      Sarnen, Obwalden, Switzerland
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
