import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://faceartow.ch"
	const locales = ["ch", "de", "en"]

	// Define your routes
	const routes = ["/", "/about", "/faq"]

	const sitemapEntries: MetadataRoute.Sitemap = []

	// Generate entries for each locale and route
	for (const locale of locales) {
		for (const route of routes) {
			sitemapEntries.push({
				url: `${baseUrl}/${locale}${route}`,
				lastModified: new Date(),
				changeFrequency: "monthly",
				priority: route === "/" ? 1 : 0.8,
			})
		}
	}

	return sitemapEntries
}
