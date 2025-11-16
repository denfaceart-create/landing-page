"use client"

import { Instagram, Sparkles } from "lucide-react"
import Link from "next/link"
import type { Language } from "@/lib/i18n"
import { getTranslation } from "@/lib/i18n"

interface FooterProps {
	lang: Language
}

export function Footer({ lang }: FooterProps) {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="bg-muted/50 border-t border-border">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid md:grid-cols-4 gap-8 mb-8">
					<div className="space-y-4">
						<Link href="/" className="flex items-center gap-2">
							<Sparkles className="h-6 w-6 text-primary" />
							<span className="font-semibold text-lg">Face Art Obwalden</span>
						</Link>
						<ul className="space-y-2 text-sm">
							{/* <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li> */}
							<li>
								<Link
									href="#gallery"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Gallery
								</Link>
							</li>
							<li>
								<Link
									href="#contact"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Contact
								</Link>
							</li>
							{/* <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li> */}
						</ul>
					</div>

					<div>
						<h3 className="font-semibold mb-4">Follow Us</h3>
						<div className="flex gap-3">
							<a
								href="https://www.instagram.com/faceartow"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
							>
								<Instagram className="h-5 w-5 text-primary" />
							</a>
						</div>
					</div>
				</div>

				<div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
					<p>
						© {currentYear} · {getTranslation(lang, "rights")}
					</p>
				</div>
			</div>
		</footer>
	)
}
