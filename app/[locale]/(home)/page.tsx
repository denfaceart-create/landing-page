import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { Contact } from "@/components/contact"
import { Gallery } from "@/components/gallery"
import { Hero } from "@/components/hero"
import PageLayout from "@/components/page-layout"
import { ScrollHandler } from "@/components/scroll-handler"
import { routing } from "@/i18n/routing"

export async function generateMetadata(
	props: Omit<PageProps<"/[locale]">, "children">,
) {
	const { locale } = await props.params

	// Ensure locale is valid before using it
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const t = await getTranslations({
		locale,
		namespace: "HomePage",
	})

	return {
		title: t("metadata.title"),
		description: t("metadata.description"),
		keywords: t.raw("metadata.keywords"),
		openGraph: t.raw("metadata.openGraph"),
		alternates: t.raw("metadata.alternates"),
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

export default function Home() {
	return (
		<PageLayout>
			<ScrollHandler />
			<Hero />
			<Gallery />
			<Contact />
		</PageLayout>
	)
}
