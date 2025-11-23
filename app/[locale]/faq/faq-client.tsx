"use client"

import { ChevronDown, HelpCircle, Palette } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FAQItemProps {
	question: string
	answer: string
	isOpen: boolean
	onToggle: () => void
	delay?: number
}

export function FAQItem({
	question,
	answer,
	isOpen,
	onToggle,
	delay = 0,
}: FAQItemProps) {
	return (
		<Card
			className="fade-in-element translate-y-4 cursor-pointer border-0 bg-card/50 opacity-0 shadow-md backdrop-blur-sm transition-all duration-700 hover:shadow-lg"
			style={{ transitionDelay: `${delay}ms` }}
			onClick={onToggle}
		>
			<CardHeader className="pb-4">
				<CardTitle className="flex items-center justify-between text-left font-semibold text-lg">
					<span className="flex items-center gap-3">
						<HelpCircle className="h-5 w-5 text-primary" />
						{question}
					</span>
					<ChevronDown
						className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
							isOpen ? "rotate-180" : ""
						}`}
					/>
				</CardTitle>
			</CardHeader>
			<CardContent
				className={`overflow-hidden transition-all duration-300 ${
					isOpen ? "max-h-96 pb-6" : "max-h-0 pb-0"
				}`}
			>
				<p className="text-muted-foreground leading-relaxed">{answer}</p>
			</CardContent>
		</Card>
	)
}

export function FAQItems() {
	const t = useTranslations("FaqPage")
	const [openItems, setOpenItems] = useState<Set<number>>(new Set())

	const toggleItem = (index: number) => {
		setOpenItems((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(index)) {
				newSet.delete(index)
			} else {
				newSet.add(index)
			}
			return newSet
		})
	}

	// Get all FAQ questions dynamically
	const questions = Array.from({ length: 10 }, (_, i) => ({
		question: t(`questions.${i}.question`),
		answer: t(`questions.${i}.answer`),
	}))

	return (
		<>
			{questions.map((item, index) => (
				<FAQItem
					key={index}
					question={item.question}
					answer={item.answer}
					isOpen={openItems.has(index)}
					onToggle={() => toggleItem(index)}
					delay={300 + index * 100}
				/>
			))}
		</>
	)
}

export function FAQClient() {
	const t = useTranslations("FaqPage")
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const elements = entry.target.querySelectorAll(".fade-in-element")
						elements.forEach((el, index) => {
							setTimeout(() => {
								el.classList.remove("opacity-0", "translate-y-4")
							}, index * 100)
						})
					}
				})
			},
			{ threshold: 0.1 },
		)

		if (contentRef.current) {
			observer.observe(contentRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<div ref={contentRef} className="container mx-auto px-4 py-16 md:py-24">
			<div className="mx-auto mb-16 max-w-4xl text-center">
				<div className="fade-in-element mb-6 inline-flex translate-y-4 items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-700">
					<Palette className="h-4 w-4 text-primary" />
					<span className="font-medium text-foreground text-sm">
						Questions & Answers
					</span>
				</div>

				<h1 className="fade-in-element mb-6 translate-y-4 text-balance font-bold text-4xl tracking-tight opacity-0 transition-all delay-100 duration-700 md:text-5xl lg:text-6xl">
					<span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
						{t("title")}
					</span>
				</h1>

				<p className="fade-in-element mx-auto max-w-2xl translate-y-4 text-balance text-muted-foreground text-xl opacity-0 transition-all delay-200 duration-700 md:text-2xl">
					{t("subtitle")}
				</p>
			</div>

			{/* FAQ Items */}
			<div className="mx-auto max-w-4xl space-y-4">
				<FAQItems />
			</div>

			{/* Contact CTA */}
			<div className="fade-in-element mx-auto mt-16 max-w-2xl translate-y-4 text-center opacity-0 transition-all delay-1500 duration-700">
				<Card className="border-0 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 shadow-lg">
					<CardContent className="p-8">
						<h3 className="mb-4 font-bold text-2xl">{t("contact.title")}</h3>
						<p className="mb-6 text-muted-foreground">
							{t("contact.description")}
						</p>
						<Button
							type="button"
							size={"lg"}
							className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
							asChild
						>
							<Link href="/#contact">{t("contact.button")}</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
