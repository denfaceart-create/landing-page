"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Flower2 } from "lucide-react"
import { useEffect, useRef } from "react"
import type { Language } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"

interface ServicesProps {
  lang: Language
}

export function Services({ lang }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".service-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.remove("opacity-0", "translate-y-8")
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: Palette,
      title: getTranslation(lang, "facePainting"),
      description: getTranslation(lang, "facePaintingDesc"),
      color: "from-primary to-primary/60",
    },
    {
      icon: Flower2,
      title: getTranslation(lang, "henna"),
      description: getTranslation(lang, "hennaDesc"),
      color: "from-secondary to-secondary/60",
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {getTranslation(lang, "servicesTitle")}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="service-card p-8 md:p-10 bg-card hover:shadow-2xl transition-all duration-500 border-2 opacity-0 translate-y-8 group overflow-hidden relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                <div className="relative z-10 space-y-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-card-foreground">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>

                  <Button
                    className="w-full mt-6 bg-foreground text-background hover:bg-foreground/90"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    {getTranslation(lang, "bookService")}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
