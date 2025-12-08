import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"

type Locale = (typeof routing.locales)[number]
type Pathnames = keyof typeof routing.pathnames

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://www.faceartow.ch"
	const lastModified = new Date()
	const locales = routing.locales as readonly Locale[]
	const defaultLocale = routing.defaultLocale as Locale

	const sitemapEntries: MetadataRoute.Sitemap = []

	// Helper to get localized path
	const getLocalizedPath = (pathname: Pathnames, locale: Locale): string => {
		const path = routing.pathnames[pathname]
		if (typeof path === "string") return path
		return path[locale as keyof typeof path] || pathname
	}

	// Helper to build URL with locale prefix
	const buildUrl = (locale: Locale, path: string): string => {
		if (locale === defaultLocale) return `${baseUrl}${path}`
		return `${baseUrl}/${locale}${path}`
	}

	// Helper to create alternates for a pathname
	const createAlternates = (
		pathname: Pathnames,
		currentLocale: Locale,
	): Record<string, string> => {
		const alternates: Record<string, string> = {}

		for (const locale of locales) {
			if (locale === currentLocale) continue

			const localizedPath = getLocalizedPath(pathname, locale)
			const url = buildUrl(locale, localizedPath)

			if (locale === defaultLocale) {
				alternates["x-default"] = url
			} else {
				alternates[locale] = url
			}
		}

		return alternates
	}

	// Generate entries for each pathname and locale
	const pathnames: Pathnames[] = Object.keys(routing.pathnames) as Pathnames[]

	for (const pathname of pathnames) {
		for (const locale of locales) {
			const localizedPath = getLocalizedPath(pathname, locale)
			const url = buildUrl(locale, localizedPath)
			const alternates = createAlternates(pathname, locale)

			sitemapEntries.push({
				url,
				lastModified,
				changeFrequency: "monthly",
				priority: pathname === "/" ? 1 : 0.8,
				alternates: {
					languages: alternates,
				},
			})
		}
	}

	return sitemapEntries
}
