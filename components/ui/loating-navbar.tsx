"use client"
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react"
import { useTranslations } from "next-intl"
import { type ComponentPropsWithoutRef, useState } from "react"
import { Link, usePathname } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

const navItems = [
	{
		name: "home",
		href: "/",
	},
	{
		name: "about",
		href: "/about",
	},
	{
		name: "faq",
		href: "/faq",
	},
] as const satisfies {
	name: string
	href: ComponentPropsWithoutRef<typeof Link>["href"]
}[]

export const FloatingNav = ({ className }: { className?: string }) => {
	const t = useTranslations("Navigation")
	const currentPathname = usePathname()
	const { scrollYProgress } = useScroll()

	const [visible, setVisible] = useState(true)

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		// Check if current is not undefined and is a number
		const prev = scrollYProgress.getPrevious()
		if (typeof current === "number" && typeof prev === "number") {
			const direction = current - prev

			setVisible(direction < 0) // Show when scrolling up, hide when scrolling down
		}
	})

	return (
		<AnimatePresence mode="wait">
			<motion.ul
				animate={{
					y: visible ? 0 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{
					duration: 0.3,
				}}
				className={cn(
					"fixed inset-x-0 top-10 z-5000 mx-auto flex max-w-fit items-center justify-center space-x-4 px-8 py-2",
					className,
				)}
			>
				{navItems.map((navItem, index) => (
					<li key={index}>
						<Link
							href={navItem.href}
							className={cn(
								"relative flex items-center space-x-1 text-neutral-600 text-sm hover:text-primary dark:text-neutral-50",
								currentPathname === navItem.href && "font-bold text-primary",
							)}
						>
							{t(navItem.name)}
						</Link>
					</li>
				))}
			</motion.ul>
		</AnimatePresence>
	)
}
