"use client"

import { Heart, Shield, Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { useFadeInElementObserver } from "@/hooks/useFadeInElementObserver"
import type messages from "@/i18n/translations/ch.d.json"

export function About() {
	const t = useTranslations("AboutPage")
	const contentRef = useFadeInElementObserver()

	const services = t.raw(
		"services.items",
	) as (typeof messages)["AboutPage"]["services"]["items"]

	return (
		<section
			id="about"
			ref={contentRef}
			className="bg-background py-6 sm:py-10 md:py-16 lg:py-24 xl:py-32"
		>
			<div className="container mx-auto px-4">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<h2 className="fade-in-element translate-y-4 text-balance font-bold font-display text-4xl tracking-tight opacity-0 transition-all duration-700 md:text-5xl lg:text-6xl">
						{t("title")}
					</h2>
					<p className="fade-in-element mt-4 translate-y-4 text-balance text-lg text-muted-foreground opacity-0 transition-all delay-100 duration-700 md:text-xl">
						{t("subtitle")}
					</p>
				</div>

				<div className="fade-in-element mx-auto mb-16 max-w-3xl translate-y-4 text-center opacity-0 transition-all delay-200 duration-700">
					<p className="text-lg text-muted-foreground leading-relaxed">
						{t("introduction")}
					</p>
				</div>

				<div className="mx-auto mb-16 grid max-w-5xl gap-8 lg:grid-cols-2">
					<div className="fade-in-element translate-y-4 rounded-3xl bg-linear-to-br from-primary/8 via-primary/4 to-transparent p-8 opacity-0 transition-all delay-300 duration-700">
						<div className="mb-4 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15">
								<Heart className="h-5 w-5 text-primary" aria-hidden="true" />
							</div>
							<h3 className="font-display font-semibold text-xl">
								{t("story.title")}
							</h3>
						</div>
						<p className="text-muted-foreground leading-relaxed">
							{t("story.content")}
						</p>
					</div>

					<div className="fade-in-element translate-y-4 rounded-3xl bg-linear-to-br from-secondary/8 via-secondary/4 to-transparent p-8 opacity-0 transition-all delay-400 duration-700">
						<div className="mb-4 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/15">
								<Star className="h-5 w-5 text-secondary" aria-hidden="true" />
							</div>
							<h3 className="font-display font-semibold text-xl">
								{t("experience.title")}
							</h3>
						</div>
						<p className="text-muted-foreground leading-relaxed">
							{t("experience.content")}
						</p>
					</div>
				</div>

				<div className="fade-in-element mx-auto mb-16 max-w-5xl translate-y-4 opacity-0 transition-all delay-500 duration-700">
					<h3 className="mb-8 text-center font-display font-semibold text-2xl">
						{t("services.title")}
					</h3>
					<ul className="flex list-none flex-wrap justify-center gap-3">
						{services.map((service, index) => (
							<li
								key={index}
								className="rounded-full border border-primary/20 bg-primary/8 px-5 py-2.5 font-medium text-foreground text-sm transition-colors hover:border-primary/40 hover:bg-primary/15"
							>
								{service}
							</li>
						))}
					</ul>
				</div>

				<div className="fade-in-element mx-auto max-w-5xl translate-y-4 rounded-3xl bg-linear-to-br from-accent/8 via-accent/4 to-transparent p-8 opacity-0 transition-all delay-600 duration-700">
					<div className="mb-4 flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15">
							<Shield className="h-5 w-5 text-accent" aria-hidden="true" />
						</div>
						<h3 className="font-display font-semibold text-xl">
							{t("commitment.title")}
						</h3>
					</div>
					<p className="text-muted-foreground leading-relaxed">
						{t("commitment.content")}
					</p>
				</div>
			</div>
		</section>
	)
}
