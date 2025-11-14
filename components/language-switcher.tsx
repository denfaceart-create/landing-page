"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import type { Language } from "@/lib/i18n"

interface LanguageSwitcherProps {
  currentLang: Language
  onLanguageChange: (lang: Language) => void
}

export function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  const languages: { code: Language; label: string }[] = [
    { code: "de-CH", label: "CH" },
    { code: "de", label: "DE" },
    { code: "en", label: "EN" },
  ]

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full p-2 shadow-lg">
      <Languages className="w-4 h-4 text-muted-foreground ml-2" />
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLang === lang.code ? "default" : "ghost"}
          size="sm"
          onClick={() => onLanguageChange(lang.code)}
          className={`rounded-full h-8 px-3 text-xs font-medium ${
            currentLang === lang.code ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  )
}
