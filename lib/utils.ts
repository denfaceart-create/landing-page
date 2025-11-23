import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Smoothly scrolls to a section by ID, with fallback for cross-browser compatibility
 */
export function scrollToSection(sectionId: string, offset: number = 0) {
	const element = document.getElementById(sectionId)
	if (!element) return

	const elementPosition =
		element.getBoundingClientRect().top + window.pageYOffset
	const offsetPosition = elementPosition - offset

	// Modern browsers with smooth scroll support
	if ("scrollBehavior" in document.documentElement.style) {
		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth",
		})
	} else {
		// Fallback for older browsers
		window.scrollTo(0, offsetPosition)
	}
}
