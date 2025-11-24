"use client"
import { Languages } from "lucide-react"
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react"
import { useTranslations } from "next-intl"
import { type ComponentPropsWithoutRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocaleSwitch } from "@/hooks/useLocaleSwitch"
import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
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

export const Navbar = ({ className }: { className?: string }) => {
	const t = useTranslations()
	const currentPathname = usePathname()
	const { scrollYProgress } = useScroll()

	const [visible, setVisible] = useState(true)

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		// Check if current is not undefined and is a number
		const prev = scrollYProgress.getPrevious()
		if (typeof current === "number" && typeof prev === "number") {
			const direction = current - prev

			setVisible(current < 0.05 || direction < 0) // Show when scrolling up, hide when scrolling down
		}
	})

	const { onSelectChange, isPending, currentLocale } = useLocaleSwitch()

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
					"fixed inset-x-0 top-0 z-10 mx-auto flex h-20 w-full items-center justify-center space-x-4 bg-background/10 px-8 py-2 shadow-xs backdrop-blur-sm",
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
							{t(`Navigation.${navItem.name}`)}
						</Link>
					</li>
				))}

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button asChild className="cursor-pointer" tabIndex={0}>
							<li>
								<Languages className="h-4 w-4" />
							</li>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>{t("LocaleSwitcher.label")}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{routing.locales.map((locale) => {
							const selected = currentLocale === locale
							return (
								<DropdownMenuItem
									key={locale}
									onClick={() => onSelectChange(locale)}
									className={`h-8 cursor-pointer rounded-full px-3 font-medium text-xs ${
										selected
											? "bg-primary text-primary-foreground"
											: "hover:bg-muted"
									}`}
									disabled={isPending}
								>
									<span className="flex items-center gap-2">
										<span>{t("LocaleSwitcher.flag", { locale })}</span>
										<span>{t("LocaleSwitcher.locale", { locale })}</span>
									</span>
								</DropdownMenuItem>
							)
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</motion.ul>
		</AnimatePresence>
	)
}
