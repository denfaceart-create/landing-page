import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import PageLayout from "./page-layout"

export default function NotFoundPage() {
	const t = useTranslations("NotFoundPage")

	return (
		<PageLayout>
			<h1>{t("title")}</h1>
			<p>{t("description")}</p>
			<Link href={"/"} prefetch={false}>
				Return to Home
			</Link>
		</PageLayout>
	)
}
