"use client"

import { usePathname } from "next/navigation"
import type { Locale } from "next-intl"

export function BreadcrumbSchema({
	breadcrumbNames,
	locale,
}: {
	breadcrumbNames: {
		home: string
		about: string
		faq: string
	}
	locale: Locale
}) {
	const pathname = usePathname()

	const baseUrl = "https://faceartow.ch"
	const segments = pathname.split("/").filter(Boolean)

	// Remove locale from segments if present
	const pathSegments = segments.filter((seg) => seg !== locale)

	const breadcrumbs = [
		{
			"@type": "ListItem",
			position: 1,
			name: breadcrumbNames.home,
			item: baseUrl,
		},
	]

	let currentPath = baseUrl
	pathSegments.forEach((segment, index) => {
		currentPath += `/${segment}`
		// Map path segments to navigation names
		const name =
			segment === "about" || segment === "faq"
				? breadcrumbNames[segment]
				: segment

		breadcrumbs.push({
			"@type": "ListItem",
			position: index + 2,
			name,
			item: currentPath,
		})
	})

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: breadcrumbs,
	}

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: It is okay here
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
