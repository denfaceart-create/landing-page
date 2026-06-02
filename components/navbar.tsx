"use client"
import { Languages, Menu, Moon, Sun, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useState } from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useLocaleSwitch } from "@/hooks/useLocaleSwitch"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn, scrollToSection } from "@/lib/utils"

const NAV_OFFSET = 80

function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	return (
		<button
			type="button"
			aria-label="Toggle dark mode"
			className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			<Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</button>
	)
}

export const Navbar = ({ className }: { className?: string }) => {
	const t = useTranslations()

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const { onSelectChange, isPending, currentLocale } = useLocaleSwitch()

	const navItems = [
		{ label: t("HomePage.gallery.title"), sectionId: "gallery" },
		{ label: t("Navigation.about"), sectionId: "about" },
		{ label: t("Navigation.faq"), sectionId: "faq" },
		{ label: t("HomePage.contactForm.contactTitle"), sectionId: "contact" },
	]

	const sectionIds = ["hero", ...navItems.map((i) => i.sectionId)]
	const activeSection = useActiveSection(sectionIds, NAV_OFFSET)

	const handleNavClick = (sectionId: string) => {
		scrollToSection(sectionId, NAV_OFFSET)
		setMobileMenuOpen(false)
	}

	return (
		<header>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
			>
				{t("Navigation.skipToContent")}
			</a>

			<nav
				aria-label={t("Navigation.mainNavigationAriaLabel")}
				className={cn(
					"fixed inset-x-0 top-0 z-15 mx-auto flex h-14 w-full items-center justify-between border border-border/50 bg-background/70 px-4 pt-6 pb-4 shadow-lg backdrop-blur-md md:px-6",
					className,
				)}
			>
				<button
					type="button"
					onClick={() => handleNavClick("hero")}
					className="font-bold font-display text-lg text-primary tracking-tight transition-opacity hover:opacity-80"
					aria-label="Go to top"
				>
					Face Art OW
				</button>

				<ul className="hidden items-center gap-1 md:flex">
					{navItems.map((item) => {
						const isActive = activeSection === item.sectionId
						return (
							<li key={item.sectionId}>
								<button
									type="button"
									onClick={() => handleNavClick(item.sectionId)}
									aria-current={isActive ? "true" : undefined}
									className={cn(
										"relative rounded-full px-3 py-1.5 font-medium text-sm transition-colors",
										isActive
											? "text-primary"
											: "text-foreground/70 hover:bg-primary/10 hover:text-primary",
									)}
								>
									{item.label}
									{isActive && (
										<motion.span
											layoutId="nav-active-indicator"
											className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-primary"
											transition={{
												type: "spring",
												stiffness: 380,
												damping: 30,
											}}
										/>
									)}
								</button>
							</li>
						)
					})}
					<li>
						<Link
							href="/terms-conditions"
							className="rounded-full px-3 py-1.5 font-medium text-foreground/70 text-sm transition-colors hover:bg-primary/10 hover:text-primary"
						>
							{t("Navigation.termsConditions")}
						</Link>
					</li>
				</ul>

				<div className="flex items-center gap-2">
					<ThemeToggle />

					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<button
								type="button"
								className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary"
								tabIndex={0}
								aria-label={t("LocaleSwitcher.label")}
							>
								<Languages className="h-4 w-4" aria-hidden="true" />
							</button>
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
										className={`my-1.5 h-8 cursor-pointer rounded-full px-3 font-medium text-xs ${
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

					<button
						type="button"
						className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary md:hidden"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle menu"
						aria-expanded={mobileMenuOpen}
					>
						{mobileMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
				</div>
			</nav>

			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, x: "-100%" }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: "-100%" }}
						transition={{ duration: 0.3 }}
						className="fixed inset-y-0 left-0 z-20 w-72 bg-background/95 shadow-xl backdrop-blur-md md:hidden"
					>
						<div className="flex h-full flex-col p-6 pt-24">
							<nav aria-label={t("Navigation.mobileNavigationAriaLabel")}>
								<ul className="space-y-2">
									{navItems.map((item) => {
										const isActive = activeSection === item.sectionId
										return (
											<li key={item.sectionId}>
												<button
													type="button"
													onClick={() => handleNavClick(item.sectionId)}
													aria-current={isActive ? "true" : undefined}
													className={cn(
														"block w-full rounded-xl px-4 py-3 text-left font-medium text-lg transition-colors",
														isActive
															? "bg-primary/10 text-primary"
															: "hover:bg-primary/10 hover:text-primary",
													)}
												>
													{item.label}
												</button>
											</li>
										)
									})}
								</ul>
							</nav>

							<div className="mt-6 border-border/50 border-t pt-6">
								<nav>
									<ul className="space-y-2">
										<li>
											<Link
												href="/accessibility"
												className="block rounded-xl px-4 py-3 transition-colors hover:bg-primary/10 hover:text-primary"
												onClick={() => setMobileMenuOpen(false)}
											>
												{t("Navigation.accessibility")}
											</Link>
										</li>
										<li>
											<Link
												href="/terms-conditions"
												className="block rounded-xl px-4 py-3 transition-colors hover:bg-primary/10 hover:text-primary"
												onClick={() => setMobileMenuOpen(false)}
											>
												{t("Navigation.termsConditions")}
											</Link>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

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
