import { useTranslations } from "next-intl"
import PageLayout from "@/components/page-layout"
import { Link } from "@/i18n/navigation"

export default function NotFoundPage() {
	const t = useTranslations("NotFoundPage")

	return (
		<PageLayout>
			<h1>{t("title")}</h1>
			<p>{t("description")}</p>
			<Link href={"/"} prefetch={false}>
				{t("backHome")}
			</Link>
		</PageLayout>
	)
}
