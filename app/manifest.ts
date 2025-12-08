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
		display: "standalone",
		start_url: "/",
		scope: "/",
		theme_color: t("theme_color"),
		background_color: "#ffffff",
		categories: ["entertainment", "lifestyle", "kids"],
		icons: [
			{
				src: "/android-icon-36x36.png",
				sizes: "36x36",
				type: "image/png",
			},
			{
				src: "/android-icon-48x48.png",
				sizes: "48x48",
				type: "image/png",
			},
			{
				src: "/android-icon-72x72.png",
				sizes: "72x72",
				type: "image/png",
			},
			{
				src: "/android-icon-96x96.png",
				sizes: "96x96",
				type: "image/png",
			},
			{
				src: "/android-icon-144x144.png",
				sizes: "144x144",
				type: "image/png",
			},
			{
				src: "/android-icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	}
}
