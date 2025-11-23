"use client"

import { Heart, Palette, Shield, Star, Users } from "lucide-react"

import { useTranslations } from "next-intl"

import { useEffect, useRef } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutClient() {
	const t = useTranslations("AboutPage")
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

	const services = Array.from({ length: 6 }, (_, i) => t(`services.items.${i}`))

	return (
		<div ref={contentRef} className="container mx-auto px-4 py-16 md:py-24">
			{/* Hero Section */}
			<div className="mx-auto mb-16 max-w-4xl text-center">
				<div className="fade-in-element mb-6 inline-flex translate-y-4 items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-700">
					<Palette className="h-4 w-4 text-primary" />
					<span className="font-medium text-foreground text-sm">
						Face Art Professional
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

			{/* Introduction */}
			<div className="fade-in-element mx-auto mb-16 max-w-3xl translate-y-4 opacity-0 transition-all delay-300 duration-700">
				<p className="text-center text-lg text-muted-foreground leading-relaxed">
					{t("introduction")}
				</p>
			</div>

			{/* Story Section */}
			<div className="mx-auto mb-16 max-w-6xl">
				<Card className="fade-in-element translate-y-4 border-0 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 shadow-lg transition-all delay-400 duration-700">
					<CardHeader>
						<CardTitle className="flex items-center gap-3 text-2xl">
							<Heart className="h-6 w-6 text-primary" />
							{t("story.title")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-lg text-muted-foreground leading-relaxed">
							{t("story.content")}
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Experience Section */}
			<div className="mx-auto mb-16 max-w-6xl">
				<Card className="fade-in-element translate-y-4 border-0 bg-linear-to-br from-secondary/5 via-accent/5 to-primary/5 opacity-0 shadow-lg transition-all delay-500 duration-700">
					<CardHeader>
						<CardTitle className="flex items-center gap-3 text-2xl">
							<Star className="h-6 w-6 text-secondary" />
							{t("experience.title")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-lg text-muted-foreground leading-relaxed">
							{t("experience.content")}
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Services Grid */}
			<div className="mx-auto mb-16 max-w-6xl">
				<h2 className="fade-in-element mb-8 translate-y-4 text-center font-bold text-3xl opacity-0 transition-all delay-600 duration-700">
					{t("services.title")}
				</h2>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{services.map((service, index) => (
						<Card
							key={index}
							className="fade-in-element translate-y-4 border-0 bg-card/50 opacity-0 shadow-md backdrop-blur-sm transition-all duration-700 hover:shadow-lg"
							style={{ transitionDelay: `${700 + index * 100}ms` }}
						>
							<CardContent className="flex items-center gap-3 p-6">
								<Users className="h-5 w-5 text-primary" />
								<span className="font-medium">{service}</span>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Commitment Section */}
			<div className="mx-auto max-w-6xl">
				<Card className="fade-in-element translate-y-4 border-0 bg-linear-to-br from-accent/5 via-primary/5 to-secondary/5 opacity-0 shadow-lg transition-all delay-1000 duration-700">
					<CardHeader>
						<CardTitle className="flex items-center gap-3 text-2xl">
							<Shield className="h-6 w-6 text-accent" />
							{t("commitment.title")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-lg text-muted-foreground leading-relaxed">
							{t("commitment.content")}
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
