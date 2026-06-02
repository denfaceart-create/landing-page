import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import PageLayout from "@/components/page-layout"
import { routing } from "@/i18n/routing"
import type messages from "@/i18n/translations/de.d.json"
import { TermsConditionsClient } from "./terms-conditions-client"

export async function generateMetadata(
	props: Omit<PageProps<"/[locale]/terms-conditions">, "children">,
) {
	const { locale } = await props.params

	// Ensure locale is valid before using it
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const t = await getTranslations({
		locale,
		namespace: "TermsConditionsPage",
	})

	return {
		title: t("metadata.title"),
		description: t("metadata.description"),
		keywords: t.raw(
			"metadata.keywords",
		) as (typeof messages)["TermsConditionsPage"]["metadata"]["keywords"],
		openGraph: t.raw(
			"metadata.openGraph",
		) as (typeof messages)["TermsConditionsPage"]["metadata"]["openGraph"],
		twitter: {
			card: "summary_large_image",
			title: t("metadata.title"),
			description: t("metadata.description"),
			creator: "@faceartow",
		},
		alternates: t.raw(
			"metadata.alternates",
		) as (typeof messages)["TermsConditionsPage"]["metadata"]["alternates"],

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

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export default async function TermsConditionsPage() {
	return (
		<PageLayout hideNavbar>
			<TermsConditionsClient />
		</PageLayout>
	)
}
