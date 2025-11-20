"use client"

import { useTranslations } from "next-intl"
import { useEffect } from "react"
import PageLayout from "@/components/page-layout"

type Props = {
	error: Error
	reset(): void
}

export default function ErrorPage({ error, reset }: Props) {
	const t = useTranslations("Error")

	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<PageLayout>
			<h1>{t("title")}</h1>
			<div>
				{t.rich("description", {
					p: (chunks) => <p className="mt-4">{chunks}</p>,
					retry: (chunks) => (
						<button
							className="underline underline-offset-2"
							onClick={reset}
							type="button"
						>
							{chunks}
						</button>
					),
				})}
			</div>
		</PageLayout>
	)
}
