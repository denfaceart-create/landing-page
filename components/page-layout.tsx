import type { PropsWithChildren } from "react"

import { Footer } from "./footer"
import { LanguageSwitcher } from "./language-switcher"

export default function PageLayout({ children }: PropsWithChildren) {
	return (
		<main className="min-h-screen">
			<LanguageSwitcher />
			{children}
			<Footer />
		</main>
	)
}
