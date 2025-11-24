import type { CSSProperties, PropsWithChildren } from "react"
import { cn } from "@/lib/utils"
import { Footer } from "./footer"
import { Navbar } from "./navbar"

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
			<Navbar />
			{children}
			<Footer />
		</main>
	)
}
