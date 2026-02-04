"use client"

import { CheckCircle, Mail, Shield } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useFadeInElementObserver } from "@/hooks/useFadeInElementObserver"
import type messages from "@/i18n/translations/ch.json"

const accessibilityStandardsItems = [
	"keyboard",
	"screenReader",
	"contrast",
	"semanticHtml",
	"focusIndicators",
] satisfies Array<
	keyof (typeof messages)["AccessibilityPage"]["standards"]["items"]
>

export function AccessibilityClient() {
	const t = useTranslations("AccessibilityPage")
	const contentRef = useFadeInElementObserver()

	return (
		<div ref={contentRef} className="container mx-auto px-4 py-16 md:py-24">
			<div className="mx-auto mb-16 max-w-4xl text-center">
				<div className="fade-in-element mb-6 inline-flex translate-y-4 items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-700">
					<Shield className="h-4 w-4 text-primary" aria-hidden="true" />
					<span className="font-medium text-foreground text-sm">
						{t("badge")}
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

			<div className="mx-auto max-w-4xl space-y-8">
				<Card className="fade-in-element translate-y-4 border-0 bg-card/50 opacity-0 shadow-md backdrop-blur-sm transition-all delay-300 duration-700">
					<CardContent className="p-8">
						<div className="flex items-start gap-4">
							<div className="rounded-lg bg-primary/10 p-3">
								<Shield className="h-6 w-6 text-primary" aria-hidden="true" />
							</div>
							<div>
								<h2 className="mb-3 font-semibold text-xl">
									{t("commitment.title")}
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									{t("commitment.description")}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="fade-in-element translate-y-4 border-0 bg-card/50 opacity-0 shadow-md backdrop-blur-sm transition-all delay-400 duration-700">
					<CardContent className="p-8">
						<div className="flex items-start gap-4">
							<div className="rounded-lg bg-secondary/10 p-3">
								<CheckCircle
									className="h-6 w-6 text-secondary"
									aria-hidden="true"
								/>
							</div>
							<div className="flex-1">
								<h2 className="mb-3 font-semibold text-xl">
									{t("standards.title")}
								</h2>
								<p className="mb-4 text-muted-foreground leading-relaxed">
									{t("standards.description")}
								</p>
								<ul className="space-y-2">
									{accessibilityStandardsItems.map((item) => (
										<li key={item} className="flex items-center gap-2">
											<CheckCircle
												className="h-4 w-4 text-primary"
												aria-hidden="true"
											/>
											<span className="text-muted-foreground">
												{t(`standards.items.${item}`)}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="fade-in-element translate-y-4 border-0 bg-linear-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 shadow-lg transition-all delay-500 duration-700">
					<CardContent className="p-8 text-center">
						<div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3">
							<Mail className="h-6 w-6 text-accent" aria-hidden="true" />
						</div>
						<h2 className="mb-3 font-semibold text-xl">
							{t("feedback.title")}
						</h2>
						<p className="mb-6 text-muted-foreground leading-relaxed">
							{t("feedback.description")}
						</p>
						<Button
							type="button"
							size="lg"
							className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
							asChild
						>
							<Link href="/#contact">{t("feedback.button")}</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
