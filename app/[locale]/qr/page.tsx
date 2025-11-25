import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { QRCodeClient } from "./qr-client"

export const metadata: Metadata = {
	title: "QR Code - Face Art Obwalden",
	robots: {
		index: false,
		follow: false,
		nocache: true,
		googleBot: {
			index: false,
			follow: false,
		},
	},
}

export async function generateMetadata(
	props: Omit<PageProps<"/[locale]/qr">, "children">,
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
		robots: {
			index: false,
			follow: false,
			nocache: true,
			googleBot: {
				index: false,
				follow: false,
			},
		},
	} satisfies Metadata
}

export default function QRPage() {
	return <QRCodeClient />
}
