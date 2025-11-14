"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "de-CH" | "de" | "en"

export const translations = {
  "de-CH": {
    // Hero
    badge: "Face Painting & Henna",
    heroTitle1: "Dini",
    heroTitle2: "Kreativität",
    heroSubtitle: "Face Painting und Henna für Events, Partys und Feste",
    ctaBook: "Buche jetzt",
    ctaServices: "Services",

    // Services
    servicesTitle: "Was mir mached",
    facePainting: "Face Painting",
    facePaintingDesc: "Professionells Face Painting für alli Altersgruppe",
    henna: "Henna Tattoos",
    hennaDesc: "Traditionelli und moderni Henna Designs",
    bookService: "Buche",

    // Gallery
    gallery: {
      title: "Üsi Arbet",
    },

    // Pricing
    pricingTitle: "Preis",
    party: "Party",
    partyDesc: "2 Stund",
    event: "Event",
    eventDesc: "4 Stund",
    premium: "Premium",
    premiumDesc: "Ganze Tag",
    bookPackage: "Buche",

    // Contact
    contactTitle: "Kontakt",
    contactSubtitle: "Schriib üs ah",
    name: "Name",
    email: "Email",
    phone: "Telefon",
    eventDate: "Event Datum",
    message: "Nachricht",
    send: "Sende",

    // Footer
    rights: "Alli Rächt vorbehalte",
  },
  de: {
    // Hero
    badge: "Face Painting & Henna",
    heroTitle1: "Deine",
    heroTitle2: "Kreativität",
    heroSubtitle: "Face Painting und Henna für Events, Partys und Feste",
    ctaBook: "Jetzt buchen",
    ctaServices: "Services",

    // Services
    servicesTitle: "Was wir machen",
    facePainting: "Face Painting",
    facePaintingDesc: "Professionelles Face Painting für alle Altersgruppen",
    henna: "Henna Tattoos",
    hennaDesc: "Traditionelle und moderne Henna Designs",
    bookService: "Buchen",

    // Gallery
    gallery: {
      title: "Unsere Arbeit",
    },

    // Pricing
    pricingTitle: "Preise",
    party: "Party",
    partyDesc: "2 Stunden",
    event: "Event",
    eventDesc: "4 Stunden",
    premium: "Premium",
    premiumDesc: "Ganzer Tag",
    bookPackage: "Buchen",

    // Contact
    contactTitle: "Kontakt",
    contactSubtitle: "Schreib uns an",
    name: "Name",
    email: "Email",
    phone: "Telefon",
    eventDate: "Event Datum",
    message: "Nachricht",
    send: "Senden",

    // Footer
    rights: "Alle Rechte vorbehalten",
  },
  en: {
    // Hero
    badge: "Face Painting & Henna",
    heroTitle1: "Your",
    heroTitle2: "Creativity",
    heroSubtitle: "Face painting and henna for events, parties and celebrations",
    ctaBook: "Book now",
    ctaServices: "Services",

    // Services
    servicesTitle: "What we do",
    facePainting: "Face Painting",
    facePaintingDesc: "Professional face painting for all ages",
    henna: "Henna Tattoos",
    hennaDesc: "Traditional and modern henna designs",
    bookService: "Book",

    // Gallery
    gallery: {
      title: "Our Work",
    },

    // Pricing
    pricingTitle: "Pricing",
    party: "Party",
    partyDesc: "2 hours",
    event: "Event",
    eventDesc: "4 hours",
    premium: "Premium",
    premiumDesc: "Full day",
    bookPackage: "Book",

    // Contact
    contactTitle: "Contact",
    contactSubtitle: "Get in touch",
    name: "Name",
    email: "Email",
    phone: "Phone",
    eventDate: "Event Date",
    message: "Message",
    send: "Send",

    // Footer
    rights: "All rights reserved",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (typeof translations)["de-CH"]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("de-CH")

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function getTranslation(lang: Language, key: keyof (typeof translations)["de-CH"]) {
  return translations[lang][key]
}
