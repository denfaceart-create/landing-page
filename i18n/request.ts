import merge from "deepmerge"
import { type AppConfig, hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
	// Typically corresponds to the `[locale]` segment
	const requested = await requestLocale
	const locale = hasLocale(routing.locales, requested)
		? requested
		: routing.defaultLocale

	const defaultMessages = (
		await import(`./translations/${routing.defaultLocale}.json`)
	).default
	const localeMessages = (await import(`./translations/${locale}.json`)).default

	const messages = merge<AppConfig["Messages"]>(
		defaultMessages,
		localeMessages,
		{ arrayMerge: (_dest, src, _options) => src },
	)
	return {
		locale,
		messages,
	}
})
