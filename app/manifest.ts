import type { MetadataRoute } from "next"
import { getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const t = await getTranslations({
		locale: routing.defaultLocale,
		namespace: "Manifest",
	})

	return {
		name: t("name"),
		short_name: t("short_name"),
		description: t("description"),
		lang: t("lang"),
		dir: "ltr",
		orientation: "portrait",

		start_url: "/",
		theme_color: t("theme_color"),
	}
}
