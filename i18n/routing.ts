import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ["de", "en"],
	localeCookie: false,
	localeDetection: false,
	// Used when no locale matches
	defaultLocale: "de",
	pathnames: {
		"/": "/",
		"/accessibility": {
			de: "/barrierefreiheit",
		},
	},
	localePrefix: "as-needed",
})
