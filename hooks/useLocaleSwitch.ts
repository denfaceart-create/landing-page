import { useParams } from "next/navigation"
import { type Locale, useLocale } from "next-intl"
import { useTransition } from "react"

import { usePathname, useRouter } from "@/i18n/navigation"

export const useLocaleSwitch = () => {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()
	const pathname = usePathname()
	const params = useParams()
	const currentLocale = useLocale()

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

	return {
		onSelectChange,
		isPending,
		currentLocale,
	}
}
