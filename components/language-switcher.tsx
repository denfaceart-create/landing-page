"use client"

import { Languages } from "lucide-react"
import { useParams } from "next/navigation"
import { type Locale, useLocale, useTranslations } from "next-intl"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export function LanguageSwitcher() {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const params = useParams()
	const t = useTranslations("LocaleSwitcher")
	const currentLang = useLocale()

	function onSelectChange(nextLocale: Locale) {
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: nextLocale },
			)
		})
	}

	return (
		<div
			title={t("label")}
			className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border bg-card/80 p-2 shadow-lg backdrop-blur-sm"
		>
			<Languages className="ml-2 h-4 w-4 text-muted-foreground" />
			{routing.locales.map((lang) => {
				const selected = currentLang === lang
				return (
					<Button
						key={lang}
						variant={selected ? "default" : "ghost"}
						size="sm"
						onClick={() => onSelectChange(lang)}
						className={`h-8 rounded-full px-3 font-medium text-xs ${
							selected ? "bg-primary text-primary-foreground" : "hover:bg-muted"
						}`}
						disabled={isPending}
					>
						{t("locale", { locale: lang })}
					</Button>
				)
			})}
		</div>
	)
}
