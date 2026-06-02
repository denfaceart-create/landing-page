import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"

import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import { BreadcrumbSchema } from "@/components/breadcrumb-schema"
import { StructuredData } from "@/components/structured-data"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { routing } from "@/i18n/routing"
import "../../styles/globals.css"

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
})

const playfairDisplay = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-display",
})

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(
	props: Omit<LayoutProps<"/[locale]">, "children">,
) {
	const { locale } = await props.params

	// Ensure locale is valid before using it
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const t = await getTranslations({
		locale,
		namespace: "LocaleLayout",
	})

	return {
		title: t("title"),
	} satisfies Metadata
}

export default async function LocaleLayout({
	children,
	params,
}: LayoutProps<"/[locale]">) {
	// Ensure that the incoming `locale` is valid
	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) notFound()

	const t = await getTranslations({
		locale,
		namespace: "Navigation",
	})

	const headersList = await headers()
	const pathname = headersList.get("x-current-path") ?? `/${locale}`

	return (
		<html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="apple-touch-icon" href="/apple-icon.png" />
				<link rel="llms-txt" href="/llms.txt" />
				<meta name="author" content="Denise Winberger, Denise Aeschbacher" />
				<StructuredData />
				<BreadcrumbSchema
					locale={locale}
					pathname={pathname}
					breadcrumbNames={{
						home: t("home"),
						about: t("about"),
						faq: t("faq"),
					}}
				/>
			</head>
			<body
				className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NextIntlClientProvider locale={locale}>
						{children}
					</NextIntlClientProvider>
				</ThemeProvider>
				<Toaster />
			</body>
			<Analytics />
		</html>
	)
}
