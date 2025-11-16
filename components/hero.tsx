"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"

interface HeroProps {
	lang: Language
}

export function Hero({ lang }: HeroProps) {
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const elements = entry.target.querySelectorAll(".fade-in-element")
						elements.forEach((el) => {
							el.classList.remove("opacity-0", "translate-y-4")
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
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
				<div
					className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "2s" }}
				/>
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-float"
					style={{ animationDelay: "4s" }}
				/>
			</div>

			<div
				ref={contentRef}
				className="container relative z-10 px-4 py-20 md:py-32"
			>
				<div className="max-w-5xl mx-auto text-center space-y-8">
					<div className="fade-in-element inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-lg opacity-0 translate-y-4 transition-all duration-700">
						<Sparkles className="w-4 h-4 text-primary" />
						<span className="text-sm font-medium text-foreground">
							{getTranslation(lang, "badge")}
						</span>
					</div>

					<h1 className="fade-in-element text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance opacity-0 translate-y-4 transition-all duration-700 delay-100">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
							{getTranslation(lang, "heroTitle1")}
						</span>
						<br />
						<span className="text-foreground">
							{getTranslation(lang, "heroTitle2")}
						</span>
					</h1>

					<p className="fade-in-element text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance opacity-0 translate-y-4 transition-all duration-700 delay-200">
						{getTranslation(lang, "heroSubtitle")}
					</p>

					<div className="fade-in-element flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 translate-y-4 transition-all duration-700 delay-300">
						<Button
							size="lg"
							className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
							onClick={() =>
								document
									.getElementById("contact")
									?.scrollIntoView({ behavior: "smooth" })
							}
						>
							{getTranslation(lang, "ctaBook")}
							<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</Button>
					</div>
				</div>
			</div>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
				<div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
					<div className="w-1.5 h-3 bg-foreground/40 rounded-full" />
				</div>
			</div>
		</section>
	)
}
