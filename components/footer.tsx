"use client"

import { Instagram, Facebook } from "lucide-react"
import type { Language } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"

interface FooterProps {
  lang: Language
}

export function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Face Painting & Henna</h3>
          </div>

          {/* Social */}
          <div className="space-y-4 md:text-right">
            <div className="flex gap-4 md:justify-end">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 text-center text-sm text-background/70">
          <p>
            © {currentYear} · {getTranslation(lang, "rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
