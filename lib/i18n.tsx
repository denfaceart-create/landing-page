"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "de-CH" | "de" | "en"

export const translations = {
  "de-CH": {
    // Hero
    badge: "Face Painting",
    heroTitle1: "Face Art",
    heroTitle2: "Obwalden",
    heroSubtitle: "Gsichtsschminke für Kindergeburtstäg, Fäscht und Verastaltige",
    ctaBook: "Buche jetzt",

    // Gallery
    gallery: "Mini Arbet",

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
    badge: "Face Painting",
    heroTitle1: "Face Art",
    heroTitle2: "Obwalden",
    heroSubtitle: "Gesichtsschminke für Kindergeburtstage, Feste und Veranstaltungen",
    ctaBook: "Jetzt buchen",

    // Gallery
    gallery: "Meine Arbeit",

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
    badge: "Face Painting",
    heroTitle1: "Face Art",
    heroTitle2: "Obwalden",
    heroSubtitle: "Face painting for birthday parties, festivals and events",
    ctaBook: "Book now",

    // Gallery
    gallery: "My Work",

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
