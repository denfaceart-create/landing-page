"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, ChevronLeft, Mail, Shield } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useFadeInElementObserver } from "@/hooks/useFadeInElementObserver"
import { Link as LocaleLink } from "@/i18n/navigation"
import type messages from "@/i18n/translations/ch.json"

const descriptionMinLength = 10
const descriptionMaxLength = 5000

const accessibilityStandardsItems = [
	"keyboard",
	"screenReader",
	"contrast",
	"semanticHtml",
	"focusIndicators",
] satisfies Array<
	keyof (typeof messages)["AccessibilityPage"]["standards"]["items"]
>

const issueTypeKeys = [
	"keyboard",
	"screenReader",
	"contrast",
	"other",
] satisfies Array<
	keyof (typeof messages)["AccessibilityPage"]["feedback"]["issueTypes"]
>

const defaultValues = {
	email: "",
	issueType: "",
	pageOrElement: "",
	description: "",
	honeypot: "",
}

export function AccessibilityClient() {
	const t = useTranslations("AccessibilityPage")
	const tNotFound = useTranslations("NotFoundPage")
	const contentRef = useFadeInElementObserver()

	const formSchema = useMemo(
		() =>
			z.object({
				email: z.email({ error: t("feedback.errors.emailInvalid") }),
				issueType: z.string().min(1, {
					error: t("feedback.errors.issueTypeRequired"),
				}),
				pageOrElement: z.string().optional(),
				description: z
					.string()
					.min(descriptionMinLength, {
						error: t("feedback.errors.descriptionMin", {
							minLength: `${descriptionMinLength}`,
						}),
					})
					.max(descriptionMaxLength, {
						error: t("feedback.errors.descriptionMax", {
							maxLength: `${descriptionMaxLength}`,
						}),
					}),
				honeypot: z.string().optional(),
			}),
		[t],
	)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	async function onSubmit(formData: z.infer<typeof formSchema>) {
		try {
			const response = await fetch("/api/accessibility-feedback", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})
			if (response.ok) {
				toast.success(t("feedback.submitSuccess"), {
					classNames: { icon: "text-primary" },
				})
				form.reset()
			} else throw new Error(response.statusText, { cause: response })
		} catch (error) {
			console.error("Accessibility feedback submission error", error)
			toast.error(t("feedback.submitError"), {
				closeButton: true,
			})
		}
	}

	return (
		<div ref={contentRef} className="bg-background py-24 md:py-32">
			<div className="container mx-auto px-4">
				<div className="fade-in-element mb-10 translate-y-4 opacity-0 transition-all duration-700">
					<LocaleLink
						href="/"
						className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-foreground/70 text-sm transition-colors hover:bg-primary/10 hover:text-primary"
					>
						<ChevronLeft className="h-4 w-4" aria-hidden="true" />
						{tNotFound("goHome")}
					</LocaleLink>
				</div>

				<div className="mx-auto mb-16 max-w-3xl text-center">
					<div className="fade-in-element mb-6 inline-flex translate-y-4 items-center gap-2 rounded-full border border-border/50 bg-card/80 px-4 py-2 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-700">
						<Shield className="h-4 w-4 text-primary" aria-hidden="true" />
						<span className="font-medium text-foreground text-sm">
							{t("badge")}
						</span>
					</div>

					<h1 className="fade-in-element mb-6 translate-y-4 text-balance font-bold font-display text-4xl tracking-tight opacity-0 transition-all delay-100 duration-700 md:text-5xl lg:text-6xl">
						{t("title")}
					</h1>

					<p className="fade-in-element mx-auto max-w-2xl translate-y-4 text-balance text-muted-foreground text-xl opacity-0 transition-all delay-200 duration-700 md:text-2xl">
						{t("subtitle")}
					</p>
				</div>

				<div className="mx-auto max-w-5xl space-y-8">
					<div className="fade-in-element translate-y-4 rounded-3xl bg-linear-to-br from-primary/8 via-primary/4 to-transparent p-8 opacity-0 transition-all delay-300 duration-700">
						<div className="mb-4 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15">
								<Shield className="h-5 w-5 text-primary" aria-hidden="true" />
							</div>
							<h2 className="font-display font-semibold text-xl">
								{t("commitment.title")}
							</h2>
						</div>
						<p className="text-muted-foreground leading-relaxed">
							{t("commitment.description")}
						</p>
					</div>

					<div className="fade-in-element translate-y-4 rounded-3xl bg-linear-to-br from-secondary/8 via-secondary/4 to-transparent p-8 opacity-0 transition-all delay-400 duration-700">
						<div className="mb-4 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/15">
								<CheckCircle
									className="h-5 w-5 text-secondary"
									aria-hidden="true"
								/>
							</div>
							<h2 className="font-display font-semibold text-xl">
								{t("standards.title")}
							</h2>
						</div>
						<p className="mb-4 text-muted-foreground leading-relaxed">
							{t("standards.description")}
						</p>
						<ul className="space-y-2">
							{accessibilityStandardsItems.map((item) => (
								<li key={item} className="flex items-center gap-2">
									<CheckCircle
										className="h-4 w-4 shrink-0 text-primary"
										aria-hidden="true"
									/>
									<span className="text-muted-foreground">
										{t(`standards.items.${item}`)}
									</span>
								</li>
							))}
						</ul>
					</div>

					<div className="fade-in-element translate-y-4 rounded-3xl bg-linear-to-br from-accent/8 via-accent/4 to-transparent p-8 opacity-0 transition-all delay-500 duration-700">
						<div className="mb-6 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/15">
								<Mail className="h-5 w-5 text-accent" aria-hidden="true" />
							</div>
							<div>
								<h2 className="font-display font-semibold text-xl">
									{t("feedback.title")}
								</h2>
								<p className="mt-1 text-muted-foreground text-sm leading-relaxed">
									{t("feedback.description")}
								</p>
							</div>
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
								aria-label={t("feedback.formTitle")}
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("feedback.email")}
												<span className="text-destructive" aria-hidden="true">
													*
												</span>
												<span className="sr-only">
													({t("feedback.required")})
												</span>
											</FormLabel>
											<FormControl>
												<Input
													type="email"
													{...field}
													placeholder={t("feedback.email")}
													className="h-12 rounded-xl"
													autoComplete="email"
													aria-required="true"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="issueType"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("feedback.issueType")}
												<span className="text-destructive" aria-hidden="true">
													*
												</span>
												<span className="sr-only">
													({t("feedback.required")})
												</span>
											</FormLabel>
											<FormControl>
												<select
													{...field}
													className="h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-foreground text-sm shadow-xs ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
													aria-required="true"
												>
													<option value="" disabled>
														—
													</option>
													{issueTypeKeys.map((key) => (
														<option key={key} value={key}>
															{t(`feedback.issueTypes.${key}`)}
														</option>
													))}
												</select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="pageOrElement"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("feedback.pageOrElement")}</FormLabel>
											<FormControl>
												<Input
													type="text"
													{...field}
													placeholder={t("feedback.pageOrElementPlaceholder")}
													className="h-12 rounded-xl"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("feedback.descriptionLabel")}
												<span className="text-destructive" aria-hidden="true">
													*
												</span>
												<span className="sr-only">
													({t("feedback.required")})
												</span>
											</FormLabel>
											<FormControl>
												<Textarea
													placeholder={t("feedback.descriptionPlaceholder")}
													className="min-h-32 resize-none rounded-xl"
													aria-required="true"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="honeypot"
									render={({ field }) => (
										<FormItem
											style={{
												position: "absolute",
												opacity: 0,
												pointerEvents: "none",
											}}
										>
											<FormControl>
												<input
													type="text"
													{...field}
													tabIndex={-1}
													autoComplete="off"
													aria-hidden="true"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									className="w-full cursor-pointer rounded-full py-6 font-semibold text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:shadow-xl"
									disabled={form.formState.isSubmitting}
								>
									{form.formState.isSubmitting && <Spinner />}
									{t("feedback.send")}
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}
