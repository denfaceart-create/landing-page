"use client"

import { AlertCircle, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import PageLayout from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function NotFoundPage() {
	const t = useTranslations("NotFoundPage")
	const navigation = useRouter()
	return (
		<PageLayout className="flex flex-col">
			<section
				id="main-content"
				className="mt-24 mb-12 flex flex-1 items-center justify-center bg-background"
			>
				<Card className="w-full max-w-2xl border-primary/20 bg-card p-8 text-center shadow-lg md:p-12">
					<div className="mb-6 flex justify-center">
						<div className="relative">
							<AlertCircle
								className="h-24 w-24 text-primary"
								strokeWidth={1.5}
							/>
							<div className="absolute top-0 right-0 h-6 w-6 animate-ping rounded-full bg-primary opacity-75" />
						</div>
					</div>

					<h1 className="mb-4 font-bold text-6xl text-primary md:text-7xl">
						404
					</h1>

					<h2 className="mb-4 text-balance font-bold text-3xl text-foreground md:text-4xl">
						{t("title")}
					</h2>

					<p className="mb-8 text-pretty text-foreground/70 text-lg leading-relaxed md:text-xl">
						{t("description")}
					</p>

					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Button
							asChild
							size="lg"
							className="bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
						>
							<Link href="/">
								<Home className="mr-2 h-5 w-5" />
								{t("goHome")}
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="cursor-pointer border-primary/30 bg-transparent text-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
							onClick={() => navigation.back()}
						>
							<ArrowLeft className="mr-2 h-5 w-5" />
							{t("goBack")}
						</Button>
					</div>

					<div className="mt-12 border-primary/10 border-t pt-8">
						<p className="text-foreground/50 text-sm">{t("errorCode")}</p>
					</div>
				</Card>
			</section>
		</PageLayout>
	)
}
