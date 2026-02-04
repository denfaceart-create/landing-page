"use client"
import { Languages, Menu, X } from "lucide-react"
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
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
		<header>
			<AnimatePresence mode="wait">
				<motion.nav
					aria-label={t("Navigation.mainNavigationAriaLabel")}
					animate={{
						y: visible ? 0 : -100,
						opacity: visible ? 1 : 0,
					}}
					transition={{
						duration: 0.3,
					}}
					className={cn(
						"fixed inset-x-0 top-0 z-15 mx-auto flex h-20 w-full items-center justify-between bg-background/20 px-4 py-2 shadow-xs backdrop-blur-sm md:justify-center md:space-x-4 md:px-8",
						className,
					)}
				>
					{/* Mobile menu button */}
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle menu"
						aria-expanded={mobileMenuOpen}
					>
						{mobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</Button>

					<ul className="hidden items-center space-x-4 md:flex">
						{navItems.map((navItem, index) => (
							<li key={index}>
								<Link
									href={navItem.href}
									aria-current={
										currentPathname === navItem.href ? "page" : undefined
									}
									className={cn(
										"relative flex items-center space-x-1 text-2xl text-neutral-600 hover:text-primary dark:text-neutral-50",
										currentPathname === navItem.href &&
											"font-bold text-primary",
									)}
								>
									{t(`Navigation.${navItem.name}`)}
								</Link>
							</li>
						))}

						<li>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										className="cursor-pointer"
										tabIndex={0}
										aria-label={t("LocaleSwitcher.label")}
									>
										<Languages className="h-4 w-4" aria-hidden="true" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>
										{t("LocaleSwitcher.label")}
									</DropdownMenuLabel>
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
						</li>
					</ul>

					{/* Mobile: Language switcher always visible */}
					<div className="md:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									size="icon"
									className="cursor-pointer"
									tabIndex={0}
									aria-label={t("LocaleSwitcher.label")}
								>
									<Languages className="h-4 w-4" aria-hidden="true" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									{t("LocaleSwitcher.label")}
								</DropdownMenuLabel>
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
					</div>
				</motion.nav>
			</AnimatePresence>

			{/* Mobile menu overlay */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, x: "-100%" }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: "-100%" }}
						transition={{ duration: 0.3 }}
						className="fixed inset-y-0 left-0 z-20 w-64 bg-background/95 shadow-lg backdrop-blur-md md:hidden"
					>
						<div className="flex h-full flex-col p-6 pt-24">
							<nav aria-label={t("Navigation.mobileNavigationAriaLabel")}>
								<ul className="space-y-4">
									{navItems.map((navItem, index) => (
										<li key={index}>
											<Link
												href={navItem.href}
												aria-current={
													currentPathname === navItem.href ? "page" : undefined
												}
												className={cn(
													"block rounded-lg px-4 py-3 text-lg transition-colors hover:bg-muted",
													currentPathname === navItem.href &&
														"bg-primary/10 font-bold text-primary",
												)}
												onClick={() => setMobileMenuOpen(false)}
											>
												{t(`Navigation.${navItem.name}`)}
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Mobile menu backdrop */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-15 bg-black/50 md:hidden"
						onClick={() => setMobileMenuOpen(false)}
						aria-hidden="true"
					/>
				)}
			</AnimatePresence>
		</header>
	)
}
