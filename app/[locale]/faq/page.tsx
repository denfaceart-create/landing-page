import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import PageLayout from "@/components/page-layout"
// import { TracingBeam } from "@/components/ui/tracing-beam"
import UnderConstructionPage from "@/components/under-contsructions"
import { routing } from "@/i18n/routing"
// import { FAQClient } from "./faq-client"

export async function generateMetadata(
	props: Omit<PageProps<"/[locale]/faq">, "children">,
) {
	const { locale } = await props.params

	// Ensure locale is valid before using it
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const t = await getTranslations({
		locale,
		namespace: "FaqPage",
	})

	return {
		title: t("metadata.title"),
		description: t("metadata.description"),
		keywords: t.raw("metadata.keywords"),
		openGraph: t.raw("metadata.openGraph"),
		alternates: t.raw("metadata.alternates"),
	} satisfies Metadata
}

export default function FAQPage() {
	return (
		<PageLayout className="pt-20">
			{/* <TracingBeam> */}
			{/* <FAQClient /> */}
			<UnderConstructionPage className="my-10" />
			{/* </TracingBeam> */}
		</PageLayout>
	)
}
