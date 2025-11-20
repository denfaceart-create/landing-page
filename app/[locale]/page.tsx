"use client"

import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Gallery } from "@/components/gallery"
import { Hero } from "@/components/hero"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function Home() {
	return (
		<main className="min-h-screen">
			<LanguageSwitcher />
			<Hero />
			<Gallery />
			<Contact />
			<Footer />
		</main>
	)
}
