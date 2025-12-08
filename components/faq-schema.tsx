"use client"

import { useTranslations } from "next-intl"
import type messages from "@/i18n/translations/ch.d.json"

export function FAQSchema() {
	const t = useTranslations("FaqPage")

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
