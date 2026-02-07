"use client"

import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"

type Props = {
	error: Error & { digest?: string }
	reset(): void
}

export default function ErrorPage({ error, reset }: Props) {
	const t = useTranslations("ErrorPage")

	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<section className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-2xl border-primary/20 bg-card p-8 text-center shadow-lg md:p-12">
				<div className="mb-6 flex justify-center">
					<div className="relative">
						<AlertTriangle
							className="h-24 w-24 text-primary"
							strokeWidth={1.5}
						/>
						<div className="absolute top-0 right-0 h-6 w-6 animate-pulse rounded-full bg-primary" />
					</div>
				</div>

				<h1 className="mb-4 text-balance font-bold text-4xl text-foreground md:text-5xl">
					{t("title")}
				</h1>

				<p className="mb-8 text-pretty text-foreground/70 text-lg leading-relaxed md:text-xl">
					{t("description")}
				</p>

				<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button
						onClick={() => reset()}
						size="lg"
						className="bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
					>
						<RefreshCw className="mr-2 h-5 w-5" />
						{t("retry")}
					</Button>
					<Button
						asChild
						size="lg"
						variant="outline"
						className="border-primary/30 bg-transparent text-foreground transition-colors hover:bg-primary/10"
					>
						<Link href="/">
							<Home className="mr-2 h-5 w-5" />
							{t("goHome")}
						</Link>
					</Button>
				</div>

				{error.digest && (
					<div className="mt-12 border-primary/10 border-t pt-8">
						<p className="text-foreground/50 text-sm">
							{t("errorId", { errorId: error.digest })}
						</p>
					</div>
				)}
			</Card>
		</section>
	)
}
