"use client"

import { BookOpen, ChevronLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useFadeInElementObserver } from "@/hooks/useFadeInElementObserver"
import { Link as LocaleLink } from "@/i18n/navigation"

export function TermsConditionsClient() {
	const t = useTranslations("TermsConditionsPage")
	const tNotFound = useTranslations("NotFoundPage")
	const contentRef = useFadeInElementObserver()

	const sections = useMemo(() => {
		return [
			{
				id: "contract",
				title: t("sections.contract.title"),
				content: t("sections.contract.content"),
			},
			{
				id: "offer",
				title: t("sections.offer.title"),
				content: t("sections.offer.content"),
			},
			{
				id: "breaks",
				title: t("sections.breaks.title"),
				content: t("sections.breaks.content"),
			},
			{
				id: "cancellation",
				title: t("sections.cancellation.title"),
				content: t("sections.cancellation.content"),
				items: t.raw("sections.cancellation.items") as string[],
				additionalNote: t("sections.cancellation.additionalNote"),
			},
			{
				id: "extraordinaryCancellation",
				title: t("sections.extraordinaryCancellation.title"),
				content: t("sections.extraordinaryCancellation.content"),
			},
			{
				id: "cancellationByArtist",
				title: t("sections.cancellationByArtist.title"),
				content: t("sections.cancellationByArtist.content"),
			},
			{
				id: "supervision",
				title: t("sections.supervision.title"),
				content: t("sections.supervision.content"),
			},
			{
				id: "prices",
				title: t("sections.prices.title"),
				content: t("sections.prices.content"),
			},
			{
				id: "payment",
				title: t("sections.payment.title"),
				content: t("sections.payment.content"),
				items: t.raw("sections.payment.paymentMethods") as string[],
				additionalNote: t("sections.payment.additionalNote"),
			},
			{
				id: "paints",
				title: t("sections.paints.title"),
				content: t("sections.paints.content"),
			},
			{
				id: "photos",
				title: t("sections.photos.title"),
				content: t("sections.photos.content"),
			},
			{
				id: "advertising",
				title: t("sections.advertising.title"),
				content: t("sections.advertising.content"),
			},
			{
				id: "workspace",
				title: t("sections.workspace.title"),
				content: t("sections.workspace.content"),
				items: t.raw("sections.workspace.spacings") as string[],
				additionalNote: t("sections.workspace.tentNote"),
			},
			{
				id: "liability",
				title: t("sections.liability.title"),
				content: t("sections.liability.content"),
			},
			{
				id: "privacy",
				title: t("sections.privacy.title"),
				content: t("sections.privacy.content"),
			},
		]
	}, [t])

	return (
		<div ref={contentRef} className="bg-background py-24 md:py-32">
			<div className="container mx-auto px-4">
				<div className="fade-in-element mb-10 translate-y-4 opacity-0 transition-all duration-700">
					<LocaleLink
						href="/"
						className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-foreground/70 text-sm transition-colors hover:bg-primary/10 hover:text-primary"
					>
						<ChevronLeft className="h-4 w-4" aria-hidden="true" />
						{tNotFound("goHome")}
					</LocaleLink>
				</div>

				<div className="mx-auto mb-16 max-w-3xl text-center">
					<div className="fade-in-element mb-6 inline-flex translate-y-4 items-center gap-2 rounded-full border border-border/50 bg-card/80 px-4 py-2 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-700">
						<BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
						<span className="font-medium text-foreground text-sm">
							{t("badge")}
						</span>
					</div>

					<h1 className="fade-in-element mb-6 translate-y-4 text-balance font-bold font-display text-4xl tracking-tight opacity-0 transition-all delay-100 duration-700 md:text-5xl lg:text-6xl">
						{t("title")}
					</h1>

					<p className="fade-in-element mx-auto max-w-2xl translate-y-4 text-balance text-muted-foreground text-xl opacity-0 transition-all delay-200 duration-700 md:text-2xl">
						{t("subtitle")}
					</p>
				</div>

				<div className="mx-auto max-w-5xl space-y-6">
					{sections.map((section, index) => (
						<div
							key={section.id}
							id={section.id}
							className="fade-in-element translate-y-4 scroll-mt-20 rounded-3xl border border-border/50 bg-card/30 p-8 opacity-0 transition-all duration-700"
							style={{
								transitionDelay: `${200 + index * 50}ms`,
							}}
						>
							<h2 className="mb-3 font-bold font-display text-foreground text-xl">
								{section.title}
							</h2>

							<div className="space-y-4 text-muted-foreground">
								<p className="leading-relaxed">{section.content}</p>

								{section.items && section.items.length > 0 && (
									<ul className="space-y-2 pl-6">
										{section.items.map((item, i) => (
											<li key={i} className="flex items-start gap-2">
												<span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />
												<span className="leading-relaxed">{item}</span>
											</li>
										))}
									</ul>
								)}

								{section.additionalNote && (
									<p className="rounded-xl bg-secondary/5 p-3.5 text-muted-foreground italic leading-relaxed">
										{section.additionalNote}
									</p>
								)}
							</div>
						</div>
					))}
				</div>

				<div className="fade-in-element mx-auto mt-12 max-w-5xl translate-y-4 rounded-3xl border border-border/50 bg-secondary/5 p-6 opacity-0 transition-all delay-700 duration-700">
					<p className="text-center text-muted-foreground text-sm leading-relaxed">
						<span className="font-semibold text-foreground">
							{t("lastUpdated.label")}
						</span>{" "}
						{new Date().getFullYear()}. {t("lastUpdated.disclaimer")}
					</p>
				</div>
			</div>
		</div>
	)
}
