"use client"

import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useFadeInElementObserver } from "@/hooks/useFadeInElementObserver"
import type messages from "@/i18n/translations/ch.d.json"
import { cn } from "@/lib/utils"

interface FAQItemProps {
	question: string
	answer: string
	isOpen: boolean
	onToggle: () => void
	index: number
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
	const buttonId = `faq-button-${index}`
	const panelId = `faq-panel-${index}`

	return (
		<div
			className={cn(
				"fade-in-element translate-y-4 rounded-2xl border border-border/50 bg-card/50 opacity-0 transition-all duration-700",
				isOpen && "border-primary/30 bg-primary/3",
			)}
			style={{ transitionDelay: `${300 + index * 80}ms` }}
		>
			<button
				type="button"
				id={buttonId}
				aria-expanded={isOpen}
				aria-controls={panelId}
				onClick={onToggle}
				className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			>
				<span className="font-medium text-foreground">{question}</span>
				<ChevronDown
					className={cn(
						"h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
						isOpen && "rotate-180 text-primary",
					)}
					aria-hidden="true"
				/>
			</button>

			<section id={panelId} aria-labelledby={buttonId} hidden={!isOpen}>
				<div
					className={cn(
						"overflow-hidden px-6 transition-all duration-300",
						isOpen ? "max-h-96 pb-5" : "max-h-0 pb-0",
					)}
				>
					<p className="text-muted-foreground leading-relaxed">{answer}</p>
				</div>
			</section>
		</div>
	)
}

export function FAQ() {
	const t = useTranslations("FaqPage")
	const contentRef = useFadeInElementObserver()
	const [openItems, setOpenItems] = useState<Set<number>>(new Set())

	const toggleItem = (index: number) => {
		setOpenItems((prev) => {
			const next = new Set(prev)
			if (next.has(index)) next.delete(index)
			else next.add(index)
			return next
		})
	}

	const questions = t.raw(
		"questions",
	) as (typeof messages)["FaqPage"]["questions"]

	return (
		<section id="faq" ref={contentRef} className="bg-muted/30 py-24 md:py-32">
			<div className="container mx-auto px-4">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<div className="fade-in-element mb-4 inline-flex translate-y-4 items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 opacity-0 transition-all duration-700">
						<span className="font-medium text-primary text-sm">
							{t("badge")}
						</span>
					</div>
					<h2 className="fade-in-element translate-y-4 text-balance font-bold font-display text-4xl tracking-tight opacity-0 transition-all delay-100 duration-700 md:text-5xl lg:text-6xl">
						{t("title")}
					</h2>
					<p className="fade-in-element mt-4 translate-y-4 text-balance text-lg text-muted-foreground opacity-0 transition-all delay-200 duration-700">
						{t("subtitle")}
					</p>
				</div>

				<div className="mx-auto max-w-3xl space-y-3">
					{questions.map((item, index) => (
						<FAQItem
							key={index}
							index={index}
							question={item.question}
							answer={item.answer}
							isOpen={openItems.has(index)}
							onToggle={() => toggleItem(index)}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
