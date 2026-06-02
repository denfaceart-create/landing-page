import { getTranslations } from "next-intl/server"
import type messages from "@/i18n/translations/de.d.json"

export async function FAQSchema() {
	const t = await getTranslations("FaqPage")

	const questions = t.raw(
		"questions",
	) as (typeof messages)["FaqPage"]["questions"]

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: questions.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	}

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: It is okay here
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
