"use client"

import { useTranslations } from "next-intl"
import {
	type CSSProperties,
	type PropsWithChildren,
	useEffect,
	useRef,
} from "react"
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
		<>
			{/* Skip to main content link for keyboard users - WCAG 2.4.1 */}
			<SkipToContentLink />

			<Navbar />

			<main
				className={cn("min-h-screen", className)}
				style={style}
				tabIndex={-1}
			>
				{children}
			</main>
			<Footer />
		</>
	)
}

const SkipToContentLink = () => {
	const t = useTranslations("Navigation")
	const isFirstRender = useRef(true)
	useEffect(() => {
		if (isFirstRender.current) isFirstRender.current = false
	}, [])

	return (
		<a
			href="#main-content"
			className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:font-medium focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring focus:ring-offset-2"
			ref={(node) => {
				const nodeFocused = !!node && document.activeElement === node
				if (nodeFocused && !isFirstRender.current) {
					node.blur() // we want to avoid focus being stuck on the link after navigation
				}
			}}
		>
			{t("skipToContent")}
		</a>
	)
}
