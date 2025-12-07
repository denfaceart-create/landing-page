import type { routing } from "@/i18n/routing"
import type messages from "./i18n/translations/ch.d.json"

declare module "next-intl" {
	interface AppConfig {
		Locale: (typeof routing.locales)[number]
		Messages: typeof messages
	}
}
