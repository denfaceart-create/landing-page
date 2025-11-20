import { type Locale, useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { use } from "react"
import PageLayout from "@/components/page-layout"

export default function PathnamesPage({
	params,
}: PageProps<"/[locale]/about">) {
	const { locale } = use(params)

	setRequestLocale(locale as Locale)

	const t = useTranslations("AboutPage")

	return (
		<PageLayout>
			<div className="max-w-[490px]">
				<h1>{t("title")}</h1>
				<p>{t("description")}</p>
			</div>
		</PageLayout>
	)
}
