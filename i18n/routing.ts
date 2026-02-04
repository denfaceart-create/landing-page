import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
	// A list of all locales that are supported
	locales: ["ch", "de", "en"],
	localeCookie: false,
	localeDetection: false,
	// Used when no locale matches
	defaultLocale: "ch",
	pathnames: {
		"/": "/",
		"/about": {
			de: "/über",
			ch: "/über",
		},
		"/faq": "/faq",
		"/accessibility": {
			de: "/barrierefreiheit",
			ch: "/barrierefreiheit",
		},
	},
	localePrefix: "as-needed",
})
