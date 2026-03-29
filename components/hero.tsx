"use client"

import { ArrowRight } from "lucide-react"
import type { Transition } from "motion/react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/lib/utils"

const easeOut: Transition = { duration: 0.7, ease: "easeOut" }

const fadeUp = (delay: number) => ({
	initial: { opacity: 0, y: 32 },
	animate: { opacity: 1, y: 0 },
	transition: { ...easeOut, delay } as Transition,
})

export function Hero() {
	const t = useTranslations("HomePage.hero")

	return (
		<section
			id="hero"
			className="relative flex min-h-screen items-center overflow-hidden bg-muted/30 pt-20"
		>
			<div
				className="pointer-events-none absolute top-48 right-48 h-37.5 w-37.5 scale-400 animate-blob-morph-once rounded-full bg-primary/15 blur-md"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute bottom-60 left-48 h-25 w-25 scale-400 animate-blob-morph-once rounded-full bg-secondary/10 blur-md"
				style={{ animationDelay: "4s" }}
				aria-hidden="true"
			/>

			<div className="container relative z-10 mx-auto px-4 py-16 md:py-24 lg:py-32 min-[375px]:px-6">
				<div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-20 min-[375px]:gap-12">
					<div className="order-2 flex flex-col items-start gap-6 lg:order-1">
						<motion.div {...fadeUp(0)}>
							<span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-medium text-primary text-sm">
								<span
									className="h-1.5 w-1.5 rounded-full bg-primary"
									aria-hidden="true"
								/>
								{t("badge")}
							</span>
						</motion.div>

						<motion.h1
							{...fadeUp(0.1)}
							className="text-balance font-bold font-display text-4xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl min-[375px]:text-5xl"
						>
							<span className="bg-linear-to-br from-primary via-primary to-secondary bg-clip-text text-transparent">
								{t("heroTitle1")}
							</span>
							<br />
							<span className="text-foreground">{t("heroTitle2")}</span>
						</motion.h1>

						<motion.p
							{...fadeUp(0.2)}
							className="max-w-lg text-balance text-lg text-muted-foreground leading-relaxed md:text-xl"
						>
							{t("heroSubtitle")}
						</motion.p>

						<motion.div
							{...fadeUp(0.3)}
							className="flex flex-col gap-3 sm:flex-row sm:items-center"
						>
							<Button
								size="lg"
								className="group rounded-full bg-primary px-8 py-6 font-semibold text-base text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/30 hover:shadow-xl"
								onClick={() => scrollToSection("contact", 80)}
								aria-label={t("ctaBookAriaLabel")}
							>
								{t("ctaBook")}
								<ArrowRight
									className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
									aria-hidden="true"
								/>
							</Button>
							<Button
								size="lg"
								variant="ghost"
								className="group rounded-full border border-border px-8 py-6 font-semibold text-base transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
								onClick={() => scrollToSection("gallery", 80)}
								aria-label={t("ctaMyWorkAriaLabel")}
							>
								{t("ctaMyWork")}
								<ArrowRight
									className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
									aria-hidden="true"
								/>
							</Button>
						</motion.div>
					</div>

					<motion.div
						className="order-1 flex justify-center lg:order-2"
						initial={{ opacity: 0, scale: 0.92 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.9,
							delay: 0.15,
							ease: "easeOut",
						}}
					>
						<div className="relative">
							<div
								className="pointer-events-none absolute -inset-6 animate-blob-morph bg-linear-to-br from-primary/20 via-secondary/15 to-accent/20 blur-sm"
								style={{ animationDelay: "0.5s" }}
								aria-hidden="true"
							/>

							<div className="relative aspect-square w-full max-w-85 animate-blob-morph overflow-hidden bg-muted shadow-2xl sm:max-w-105 lg:max-w-120">
								{/* biome-ignore lint/performance/noImgElement: intentional */}
								<img
									src="/assets/face_art_ow_den_1200x1200.webp"
									alt="Denise Winberger — Face Art Obwalden"
									className="h-full w-full object-cover"
									loading="eager"
								/>
							</div>

							<div
								className="absolute -top-4 -right-4 h-14 w-14 animate-gentle-sway rounded-full bg-accent/80 shadow-lg"
								style={{ animationDelay: "0s" }}
								aria-hidden="true"
							/>
							<div
								className="absolute -bottom-6 -left-6 h-10 w-10 animate-gentle-sway rounded-full bg-secondary/60 shadow-md"
								style={{ animationDelay: "2s" }}
								aria-hidden="true"
							/>
							<div
								className="absolute top-1/2 -right-8 h-6 w-6 animate-gentle-sway rounded-full bg-primary/50"
								style={{ animationDelay: "1s" }}
								aria-hidden="true"
							/>
						</div>
					</motion.div>
				</div>
			</div>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
				<div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-foreground/20 p-2">
					<div className="h-3 w-1.5 rounded-full bg-foreground/40" />
				</div>
			</div>
		</section>
	)
}
