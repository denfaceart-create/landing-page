"use client"

import { useEffect, useRef, useState } from "react"

export function useActiveSection(
	sectionIds: string[],
	offset = 80,
): string | null {
	const [activeSection, setActiveSection] = useState<string | null>(null)
	const sectionIdsRef = useRef(sectionIds)
	sectionIdsRef.current = sectionIds

	const prevScrollYRef = useRef(0)

	useEffect(() => {
		function compute(direction: "down" | "up"): string | null {
			const scrollY = window.scrollY

			const sections = sectionIdsRef.current
				.map((id) => {
					const el = document.getElementById(id)
					if (!el) return null
					return { id, top: el.getBoundingClientRect().top + scrollY }
				})
				.filter((s): s is { id: string; top: number } => s !== null)

			if (sections.length === 0) return null

			// Direction-aware trigger line:
			// Down — section must be 35% into the viewport to avoid premature switches.
			// Up   — switch back the moment the section top clears the navbar.
			const triggerLine =
				direction === "down"
					? scrollY + offset + window.innerHeight * 0.35
					: scrollY + offset

			let active: string | null = null
			for (const section of sections) {
				if (section.top <= triggerLine) {
					active = section.id
				} else {
					break
				}
			}

			return active ?? sections[0].id
		}

		function onScroll() {
			const currentScrollY = window.scrollY
			const direction = currentScrollY >= prevScrollYRef.current ? "down" : "up"
			prevScrollYRef.current = currentScrollY
			setActiveSection(compute(direction))
		}

		let resizeTimer: ReturnType<typeof setTimeout>
		function onResize() {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => {
				setActiveSection(compute("down"))
			}, 100)
		}

		prevScrollYRef.current = window.scrollY
		setActiveSection(compute("down"))

		window.addEventListener("scroll", onScroll, { passive: true })
		window.addEventListener("resize", onResize, { passive: true })
		return () => {
			window.removeEventListener("scroll", onScroll)
			window.removeEventListener("resize", onResize)
			clearTimeout(resizeTimer)
		}
	}, [offset])

	return activeSection
}
