import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { Activity, Suspense } from "react"
import { Contact } from "@/components/contact"
import { Hero } from "@/components/hero"
import PageLayout from "@/components/page-layout"
import { ScrollHandler } from "@/components/scroll-handler"
import { routing } from "@/i18n/routing"
import type messages from "@/i18n/translations/ch.d.json"

const Gallery = dynamic(() =>
	import("@/components/gallery").then((mod) => mod.Gallery),
)

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
		keywords: t.raw(
			"metadata.keywords",
		) as (typeof messages)["HomePage"]["metadata"]["keywords"],
		openGraph: t.raw(
			"metadata.openGraph",
		) as (typeof messages)["HomePage"]["metadata"]["openGraph"],
		twitter: {
			card: "summary_large_image",
			title: t("metadata.title"),
			description: t("metadata.description"),
			creator: "@faceartow",
			site: "@faceartow",
		},
		alternates: t.raw(
			"metadata.alternates",
		) as (typeof messages)["HomePage"]["metadata"]["alternates"],
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
			<Suspense fallback={null}>
				<Activity>
					<Gallery />
				</Activity>
			</Suspense>
			<Contact />
		</PageLayout>
	)
}
