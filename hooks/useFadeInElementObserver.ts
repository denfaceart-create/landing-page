import { useEffect, useRef } from "react"

export const useFadeInElementObserver = () => {
	const contentRef = useRef<HTMLDivElement>(null)
	const timeOutIds = useRef<NodeJS.Timeout[]>([])

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
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
			},
			{ threshold: 0.1 },
		)

		if (contentRef.current) {
			observer.observe(contentRef.current)
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
