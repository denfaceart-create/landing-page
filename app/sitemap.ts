import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://faceartow.ch"
	const locales = routing.locales

	// Define your routes
	const routes = ["/", "/about", "/faq"]

	const sitemapEntries: MetadataRoute.Sitemap = []

	// Generate entries for each locale and route
	for (const locale of locales) {
		for (const route of routes) {
			sitemapEntries.push({
				url: routing.defaultLocale
					? `${baseUrl}${route}`
					: `${baseUrl}/${locale}${route}`,
				lastModified: new Date(),
				changeFrequency: "monthly",
				priority: route === "/" ? 1 : 0.8,
				alternates: Object.fromEntries(
					locales
						.filter((altLocale) => altLocale !== locale)
						.map((altLocale) => [
							altLocale,
							routing.defaultLocale
								? `${baseUrl}${route}`
								: `${baseUrl}/${altLocale}${route}`,
						]),
				),
				// images: [], // TODO: Add images
				// videos: [], // TODO: Add videos
			} satisfies MetadataRoute.Sitemap[number])
		}
	}

	return sitemapEntries
}
