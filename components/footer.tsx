"use client"

import { Instagram, Sparkles } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function Footer() {
	const t = useTranslations("HomePage")
	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-border border-t bg-muted/50">
			<div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
				<div className="mb-8 grid gap-8 md:grid-cols-4">
					<div className="space-y-4">
						<Link href="/" className="flex items-center gap-2">
							<Sparkles className="h-6 w-6 text-primary" />
							<span className="font-semibold text-lg">Face Art Obwalden</span>
						</Link>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="/about"
									className="text-muted-foreground transition-colors hover:text-primary"
								>
									About Me
								</Link>
							</li>
							<li>
								<Link
									href="#gallery"
									className="text-muted-foreground transition-colors hover:text-primary"
								>
									Gallery
								</Link>
							</li>
							<li>
								<Link
									href="#contact"
									className="text-muted-foreground transition-colors hover:text-primary"
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									href="/faq"
									className="text-muted-foreground transition-colors hover:text-primary"
								>
									FAQ
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="mb-4 font-semibold">Follow Me</h3>
						<div className="flex gap-3">
							<a
								href="https://www.instagram.com/faceartow"
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors hover:bg-primary/20"
							>
								<Instagram className="h-5 w-5 text-primary" />
							</a>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center gap-4 border-border border-t pt-8 text-muted-foreground text-sm sm:flex-row">
					<p>
						© {currentYear} · {t("footer.rights")}
					</p>
				</div>
			</div>
		</footer>
	)
}
