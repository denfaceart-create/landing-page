import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"

import "../styles/globals.css"
import { StructuredData } from "@/components/structured-data"
import { Toaster } from "@/components/ui/sonner"

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
})

export async function generateMetadata(
	_props: Omit<LayoutProps<"/">, "children">,
) {
	return {
		title: "Face Art Obwaldä - Face Painting",
		description:
			"Transform your celebrations with stunning face painting. Professional, creative, and unforgettable.",
		manifest: "/manifest.json",
		// themeColor: "#d946ef",
		// viewport: "width=device-width, initial-scale=1, maximum-scale=5",
		appleWebApp: {
			capable: true,
			statusBarStyle: "default",
			title: "Face Art Obwaldä",
		},
	} satisfies Metadata
}

// Since we have a `not-found.tsx` page on the root, a root layout file is required
export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="de-CH">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="apple-touch-icon" href="/apple-icon.png" />
				<StructuredData />
			</head>
			<body className={`${plusJakartaSans.variable} font-sans antialiased`}>
				{children}
				<Analytics />
				<Toaster />
			</body>
		</html>
	)
}
