import type { Metadata } from "next"
import { host } from "@/config"

export async function generateMetadata(
	_props: Omit<LayoutProps<"/">, "children">,
) {
	return {
		title: "Face Art Obwalden - Face Painting",
		description:
			"Transform your celebrations with stunning face painting. Professional, creative, and unforgettable.",
		metadataBase: new URL(host),
		manifest: "/manifest.json",
		appleWebApp: {
			capable: true,
			statusBarStyle: "default",
			title: "Face Art Obwalden",
		},

		icons: {
			icon: "/favicon.ico",
			apple: "/apple-icon.png",
		},
		openGraph: {
			title: "Face Art Obwalden - Face Painting",
			description:
				"Transform your celebrations with stunning face painting. Professional, creative, and unforgettable.",
			url: host,
			siteName: "Face Art Obwalden",
			images: [
				{
					url: `${host}/logo.png`,
					width: 1024,
					height: 1024,
					alt: "Face Art Obwalden Logo",
				},
			],
			locale: "de_CH",
			type: "website",
		},
		twitter: {
			card: "summary",
			title: "Face Art Obwalden - Face Painting",
			description:
				"Transform your celebrations with stunning face painting. Professional, creative, and unforgettable.",
			images: [`${host}/logo.png`],
		},
	} satisfies Metadata
}

// This layout is only used for root-level pages (e.g., not-found)
// Locale-specific layouts with HTML/body tags are in app/[locale]/layout.tsx
export default function RootLayout({ children }: LayoutProps<"/">) {
	return children
}
