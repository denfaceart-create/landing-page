"use client"

import { useEffect } from "react"

/**
 * Hook to handle smooth scrolling when navigating with URL hash
 */
export function useScrollHandler() {
	useEffect(() => {
		// Handle back/forward navigation and page load with hash
		const handleHashScroll = () => {
			const hash = window.location.hash
			if (hash) {
				const elementId = hash.substring(1)
				setTimeout(() => {
					document.getElementById(elementId)?.scrollIntoView({
						behavior: "smooth",
						block: "start",
						inline: "nearest",
					})
				}, 100) // Small delay just to ensure page is rendered
			}
		}

		// Handle initial load
		handleHashScroll()

		// Listen for hash changes
		window.addEventListener("hashchange", handleHashScroll)

		return () => {
			window.removeEventListener("hashchange", handleHashScroll)
		}
	}, [])
}
