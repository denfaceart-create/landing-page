import type { Metadata } from "next"

export async function generateMetadata(
	_props: Omit<LayoutProps<"/">, "children">,
) {
	return {
		title: "Face Art Obwaldä - Face Painting",
		description:
			"Transform your celebrations with stunning face painting. Professional, creative, and unforgettable.",
		manifest: "/manifest.json",
		appleWebApp: {
			capable: true,
			statusBarStyle: "default",
			title: "Face Art Obwaldä",
		},
	} satisfies Metadata
}

// This layout is only used for root-level pages (e.g., not-found)
// Locale-specific layouts with HTML/body tags are in app/[locale]/layout.tsx
export default function RootLayout({ children }: LayoutProps<"/">) {
	return children
}
