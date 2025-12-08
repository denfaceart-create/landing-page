import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"

import PageLayout from "@/components/page-layout"

import { routing } from "@/i18n/routing"
import type messages from "@/i18n/translations/ch.d.json"
import { AboutClient } from "./about-client"

export async function generateMetadata(
	props: Omit<PageProps<"/[locale]/about">, "children">,
) {
	const { locale } = await props.params

	// Ensure locale is valid before using it
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const t = await getTranslations({
		locale,
		namespace: "AboutPage",
	})

	return {
		title: t("metadata.title"),
		description: t("metadata.description"),
		keywords: t.raw(
			"metadata.keywords",
		) as (typeof messages)["AboutPage"]["metadata"]["keywords"],
		openGraph: t.raw(
			"metadata.openGraph",
		) as (typeof messages)["AboutPage"]["metadata"]["openGraph"],

		twitter: {
			card: "summary_large_image",
			title: t("metadata.title"),
			description: t("metadata.description"),
			creator: "@faceartow",
		},
		alternates: t.raw(
			"metadata.alternates",
		) as (typeof messages)["AboutPage"]["metadata"]["alternates"],
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
			},
		},
	} satisfies Metadata
}

export default function AboutPage() {
	return (
		<PageLayout className="pt-20">
			<AboutClient />
		</PageLayout>
	)
}
