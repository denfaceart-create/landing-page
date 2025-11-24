"use client"

import { Construction } from "lucide-react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function UnderConstructionPage({
	className,
}: {
	className?: string
}) {
	const t = useTranslations("UnderConstructionPage")
	return (
		<div
			className={cn(
				"flex items-center justify-center bg-background p-4",
				className,
			)}
		>
			<Card className="w-full max-w-2xl border-primary/20 bg-card p-8 text-center shadow-lg md:p-12">
				<div className="mb-6 flex justify-center">
					<div className="relative">
						<Construction
							className="h-24 w-24 animate-pulse text-primary"
							strokeWidth={1.5}
						/>
						<div className="-bottom-2 -right-2 absolute h-8 w-8 animate-bounce rounded-full bg-primary" />
					</div>
				</div>

				<h1 className="mb-4 text-balance font-bold text-4xl text-foreground md:text-5xl">
					{t("title")}
				</h1>

				<p className="mb-8 text-pretty text-foreground/70 text-lg leading-relaxed md:text-xl">
					{t("description")}
				</p>

				<div className="mt-12 border-primary/10 border-t pt-8">
					<p className="text-foreground/50 text-sm">{t("expectedLaunch")}</p>
				</div>
			</Card>
		</div>
	)
}
