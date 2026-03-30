import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import PageLayout from "@/components/page-layout"

import { routing } from "@/i18n/routing"
import type messages from "@/i18n/translations/ch.json"
import { AccessibilityClient } from "./accessibility-client"

export async function generateMetadata(
	props: Omit<PageProps<"/[locale]/accessibility">, "children">,
) {
	const { locale } = await props.params

	// Ensure locale is valid before using it
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const t = await getTranslations({
		locale,
		namespace: "AccessibilityPage",
	})

	return {
		title: t("metadata.title"),
		description: t("metadata.description"),
		keywords: t.raw(
			"metadata.keywords",
		) as (typeof messages)["AccessibilityPage"]["metadata"]["keywords"],
		openGraph: t.raw(
			"metadata.openGraph",
		) as (typeof messages)["AccessibilityPage"]["metadata"]["openGraph"],
		twitter: {
			card: "summary_large_image",
			title: t("metadata.title"),
			description: t("metadata.description"),
			creator: "@faceartow",
		},
		alternates: t.raw(
			"metadata.alternates",
		) as (typeof messages)["AccessibilityPage"]["metadata"]["alternates"],

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

export default function AccessibilityPage() {
	return (
		<PageLayout hideNavbar>
			<AccessibilityClient />
		</PageLayout>
	)
}
