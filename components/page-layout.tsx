import type { CSSProperties, PropsWithChildren } from "react"
import { cn } from "@/lib/utils"
import { Footer } from "./footer"
import { LanguageSwitcher } from "./language-switcher"
import { FloatingNav } from "./ui/loating-navbar"

interface PageLayoutProps extends PropsWithChildren {
	className?: string
	style?: CSSProperties
}

export default function PageLayout({
	children,
	className,
	style,
}: PageLayoutProps) {
	return (
		<main className={cn("min-h-screen", className)} style={style}>
			<LanguageSwitcher />
			<FloatingNav />
			{children}
			<Footer />
		</main>
	)
}
