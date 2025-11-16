"use client"

import { Hero } from "@/components/hero"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useState } from "react"
import type { Language } from "@/lib/i18n"

export default function Home() {
	const [language, setLanguage] = useState<Language>("de-CH")

	return (
		<main className="min-h-screen">
			<LanguageSwitcher currentLang={language} onLanguageChange={setLanguage} />
			<Hero lang={language} />
			<Gallery />
			<Contact lang={language} />
			<Footer lang={language} />
		</main>
	)
}
