"use client"

import { Contact } from "@/components/contact"
import { Gallery } from "@/components/gallery"
import { Hero } from "@/components/hero"
import PageLayout from "@/components/page-layout"
import { useScrollHandler } from "@/components/scroll-handler"

export default function Home() {
	useScrollHandler()
	return (
		<PageLayout>
			<Hero />
			<Gallery />
			<Contact />
		</PageLayout>
	)
}
