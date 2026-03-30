"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, MapPin, Phone } from "lucide-react"
import { type Locale, useLocale, useTranslations } from "next-intl"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import deLabels from "react-phone-number-input/locale/de"
import enLabels from "react-phone-number-input/locale/en"
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
import { PhoneInput } from "@/components/ui/phone-input"
import { Textarea } from "@/components/ui/textarea"
import { location, myEmailAddress, phoneNumber } from "@/config"
import { Spinner } from "./ui/spinner"

const messageMinLength = 10
const messageMaxLength = 500

const getLocaleCountryLabels = (locale: Locale) => {
	switch (locale) {
		case "en":
			return enLabels
		default:
			return deLabels
	}
}

const defaultValues = {
	name: "",
	email: "",
	phone: "",
	message: "",
	honeypot: "",
}

const contactDetails = [
	{
		icon: Mail,
		colorClass: "bg-primary/10 text-primary",
		hoverClass: "hover:text-primary",
		key: "email" as const,
		href: `mailto:${myEmailAddress}`,
		value: myEmailAddress,
	},
	{
		icon: Phone,
		colorClass: "bg-accent/10 text-accent",
		hoverClass: "hover:text-accent",
		key: "phone" as const,
		href: `tel:${phoneNumber}`,
		value: phoneNumber,
	},
	{
		icon: MapPin,
		colorClass: "bg-secondary/10 text-secondary",
		hoverClass: null,
		key: "location" as const,
		href: null,
		value: location,
	},
]

export function Contact() {
	const t = useTranslations("HomePage")
	const locale = useLocale()
	const formSchema = useMemo(
		() =>
			z.object({
				name: z
					.string()
					.min(1, { error: t("contactForm.errors.nameRequired") }),
				email: z.email({ error: t("contactForm.errors.emailInvalid") }),
				phone: z.string().optional(),
				message: z
					.string()
					.min(messageMinLength, {
						error: t("contactForm.errors.messageMin", {
							minLength: `${messageMinLength}`,
						}),
					})
					.max(messageMaxLength, {
						error: t("contactForm.errors.messageMax", {
							maxLength: `${messageMaxLength}`,
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
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})
			if (response.ok) {
				toast.success(t("contactForm.submitSuccess"), {
					classNames: { icon: "text-primary" },
				})
				form.reset()
			} else throw new Error(response.statusText, { cause: response })
		} catch (error) {
			console.error("Form submission error", error)
			toast.error(t("contactForm.submitError"), {
				closeButton: true,
			})
		}
	}

	const countryLabels = getLocaleCountryLabels(locale)

	return (
		<section
			id="contact"
			className="relative overflow-hidden bg-background py-6 sm:py-10 md:py-16 lg:py-24 xl:py-32"
		>
			<div
				className="pointer-events-none absolute right-0 bottom-0 h-125 w-125 animate-blob-morph rounded-full bg-primary/8 blur-3xl"
				aria-hidden="true"
			/>

			<div className="container relative z-10 mx-auto px-4">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<h2 className="text-balance font-bold font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">
						{t("contactForm.contactTitle")}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						{t("contactForm.contactSubtitle")}
					</p>
				</div>

				<div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_auto]">
					<div className="rounded-3xl border border-border/50 bg-card/50 p-8 shadow-sm backdrop-blur-sm">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<div className="grid grid-cols-12 gap-4">
									<div className="col-span-12 md:col-span-6">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														{t("contactForm.name")}
														<span
															className="text-destructive"
															aria-hidden="true"
														>
															*
														</span>
														<span className="sr-only">
															({t("contactForm.required")})
														</span>
													</FormLabel>
													<FormControl>
														<Input
															type="text"
															{...field}
															placeholder={t("contactForm.name")}
															className="h-12 rounded-xl"
															autoComplete="name"
															aria-required="true"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="col-span-12 md:col-span-6">
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														{t("contactForm.email")}
														<span
															className="text-destructive"
															aria-hidden="true"
														>
															*
														</span>
														<span className="sr-only">
															({t("contactForm.required")})
														</span>
													</FormLabel>
													<FormControl>
														<Input
															type="email"
															{...field}
															placeholder={t("contactForm.email")}
															className="h-12 rounded-xl"
															autoComplete="email"
															aria-required="true"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem className="flex flex-col items-start">
											<FormLabel>
												{t("contactForm.phone")}
												<span className="text-muted-foreground text-sm">
													({t("contactForm.optional")})
												</span>
											</FormLabel>
											<FormControl className="w-full">
												<PhoneInput
													placeholder={t("contactForm.phone")}
													{...field}
													defaultCountry="CH"
													className="*:h-12"
													focusInputOnCountrySelection
													smartCaret
													labels={countryLabels}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="message"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{t("contactForm.message")}
												<span className="text-destructive" aria-hidden="true">
													*
												</span>
												<span className="sr-only">
													({t("contactForm.required")})
												</span>
											</FormLabel>
											<FormControl>
												<Textarea
													placeholder={t("contactForm.message")}
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
									{t("contactForm.send")}
								</Button>
							</form>
						</Form>
					</div>

					<div className="flex flex-col justify-center gap-6 lg:w-64">
						<h3 className="font-display font-semibold text-xl">
							{t("contactInfo.title")}
						</h3>
						<div className="space-y-5">
							{contactDetails.map((detail) => (
								<div key={detail.key} className="flex items-start gap-4">
									<div
										className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${detail.colorClass}`}
									>
										<detail.icon className="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<div className="mb-0.5 font-medium text-sm">
											{t(`contactInfo.${detail.key}`)}
										</div>
										{detail.href ? (
											<a
												href={detail.href}
												className={`text-muted-foreground text-sm transition-colors ${detail.hoverClass}`}
											>
												{detail.value}
											</a>
										) : (
											<p className="text-muted-foreground text-sm">
												{detail.value}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
