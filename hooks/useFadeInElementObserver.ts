import { useEffect, useRef } from "react"

export const useFadeInElementObserver = () => {
	const contentRef = useRef<HTMLDivElement>(null)
	const timeOutIds = useRef<NodeJS.Timeout[]>([])

	useEffect(() => {
		const triggerFadeIn = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const elements = entry.target.querySelectorAll(".fade-in-element")
					elements.forEach((el, index) => {
						const timeoutId = setTimeout(() => {
							el.classList.remove("opacity-0", "translate-y-4")
						}, index * 100)
						timeOutIds.current.push(timeoutId)
					})
				}
			})
		}

		const observer = new IntersectionObserver(triggerFadeIn, {
			threshold: 0.01,
			rootMargin: "50px",
		})

		if (contentRef.current) {
			observer.observe(contentRef.current)
			// Trigger immediately for elements already in view on mount
			const checkTimeout = setTimeout(() => {
				if (contentRef.current) {
					const elements = contentRef.current.querySelectorAll(".fade-in-element")
					if (elements.length > 0) {
						elements.forEach((el, index) => {
							const timeoutId = setTimeout(() => {
								if (!el.classList.contains("opacity-0")) return
								el.classList.remove("opacity-0", "translate-y-4")
							}, index * 100)
							timeOutIds.current.push(timeoutId)
						})
					}
				}
			}, 50)
			timeOutIds.current.push(checkTimeout)
		}

		return () => {
			timeOutIds.current.forEach((id) => {
				clearTimeout(id)
			})
			observer.disconnect()
		}
	}, [])

	return contentRef
}
