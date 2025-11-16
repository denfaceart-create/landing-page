import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/i18n"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata: Metadata = {
	title: "Face Art Obwaldä - Face Painting",
	description:
		"Transform your celebrations with stunning face painting. Professional, creative, and unforgettable.",
	manifest: "/manifest.json",
	themeColor: "#d946ef",
	viewport: "width=device-width, initial-scale=1, maximum-scale=5",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Face Art Obwaldä",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="apple-touch-icon" href="/icon-192.jpg" />
			</head>
			<body className={`${plusJakartaSans.variable} font-sans antialiased`}>
				<LanguageProvider>{children}</LanguageProvider>
				<Analytics />
			</body>
		</html>
	)
}
