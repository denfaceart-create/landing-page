"use client"

import type { CSSProperties, PropsWithChildren } from "react"
import { cn } from "@/lib/utils"
import { Footer } from "./footer"
import { Navbar } from "./navbar"

interface PageLayoutProps extends PropsWithChildren {
	className?: string
	style?: CSSProperties
	hideNavbar?: boolean
}

export default function PageLayout({
	children,
	className,
	style,
	hideNavbar = false,
}: PageLayoutProps) {
	return (
		<>
			{!hideNavbar && <Navbar />}

			<main
				id="main-content"
				className={cn("min-h-screen", className)}
				style={style}
			>
				{children}
			</main>
			<Footer />
		</>
	)
}
