"use client"

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
		<>
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
