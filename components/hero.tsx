"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/lib/utils"

export function Hero() {
	const t = useTranslations("HomePage.hero")

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
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute top-20 left-10 h-72 w-72 animate-float rounded-full bg-primary/20 blur-3xl" />
				<div
					className="absolute right-10 bottom-20 h-96 w-96 animate-float rounded-full bg-secondary/20 blur-3xl"
					style={{ animationDelay: "2s" }}
				/>
				<div
					className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[600px] w-[600px] animate-float rounded-full bg-accent/10 blur-3xl"
					style={{ animationDelay: "4s" }}
				/>
			</div>

			<div
				ref={contentRef}
				className="container relative z-10 px-4 py-20 md:py-32"
			>
				<div className="mx-auto max-w-5xl space-y-8 text-center">
					<div className="fade-in-element inline-flex translate-y-4 items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-700">
						<Sparkles className="h-4 w-4 text-primary" />
						<span className="font-medium text-foreground text-sm">
							{t("badge")}
						</span>
					</div>

					<h1 className="fade-in-element translate-y-4 text-balance font-bold text-5xl tracking-tight opacity-0 transition-all delay-100 duration-700 md:text-7xl lg:text-8xl">
						<span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
							{t("heroTitle1")}
						</span>
						<br />
						<span className="text-foreground">{t("heroTitle2")}</span>
					</h1>

					<p className="fade-in-element mx-auto max-w-2xl translate-y-4 text-balance text-muted-foreground text-xl opacity-0 transition-all delay-200 duration-700 md:text-2xl">
						{t("heroSubtitle")}
					</p>

					<div className="fade-in-element flex translate-y-4 flex-col items-center justify-center gap-4 opacity-0 transition-all delay-300 duration-700 sm:flex-row">
						<Button
							size="lg"
							className="group rounded-xl bg-primary px-8 py-6 text-lg text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
							onClick={() => scrollToSection("contact", 80)}
						>
							{t("ctaBook")}
							<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</Button>
					</div>
				</div>
			</div>

			<div className="-translate-x-1/2 absolute bottom-8 left-1/2 animate-bounce">
				<div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-foreground/20 p-2">
					<div className="h-3 w-1.5 rounded-full bg-foreground/40" />
				</div>
			</div>
		</section>
	)
}
