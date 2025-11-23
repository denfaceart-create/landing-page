import type { Metadata } from "next"

import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"

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

	return <NextIntlClientProvider>{children}</NextIntlClientProvider>
}
