"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import type { Language } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"

interface PricingProps {
  lang: Language
}

export function Pricing({ lang }: PricingProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".pricing-card")
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

  const packages = [
    {
      name: getTranslation(lang, "party"),
      price: "CHF 150",
      duration: getTranslation(lang, "partyDesc"),
      popular: false,
    },
    {
      name: getTranslation(lang, "event"),
      price: "CHF 300",
      duration: getTranslation(lang, "eventDesc"),
      popular: true,
    },
    {
      name: getTranslation(lang, "premium"),
      price: "CHF 500",
      duration: getTranslation(lang, "premiumDesc"),
      popular: false,
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {getTranslation(lang, "pricingTitle")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`pricing-card p-8 relative opacity-0 translate-y-8 transition-all duration-500 hover:shadow-2xl ${
                pkg.popular ? "border-primary border-2 md:scale-105" : "border"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  ★
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-card-foreground">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                </div>

                <div className="text-4xl font-bold text-card-foreground">{pkg.price}</div>

                <Button
                  className={`w-full ${
                    pkg.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-foreground hover:bg-foreground/90 text-background"
                  }`}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {getTranslation(lang, "bookPackage")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
