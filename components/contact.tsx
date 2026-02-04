"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, MapPin, Phone } from "lucide-react"
import { type Locale, useLocale, useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import deLabels from "react-phone-number-input/locale/de"
import enLabels from "react-phone-number-input/locale/en"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

const getLocaleCountryLabels = (locale: Locale) => {
	switch (locale) {
		case "en":
			return enLabels
		default:
			return deLabels
	}
}

const formSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	phone: z.string().optional(),
	message: z.string().min(10).max(5000),
	honeypot: z.string().optional(),
})

const defaultValues: z.infer<typeof formSchema> = {
	name: "",
	email: "",
	phone: "",
	message: "",
	honeypot: "",
}

export function Contact() {
	const t = useTranslations("HomePage")
	const locale = useLocale()
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
				toast.success(
					<p className="text-secondary">{t("contactForm.submitSuccess")}</p>,
					{ classNames: { icon: "text-primary" } },
				)
				form.reset()
			} else throw new Error(response.statusText, { cause: response })
		} catch (error) {
			console.error("Form submission error", error)
			toast.error(t("contactForm.submitError"), {
				closeButton: true,
				richColors: true,
			})
		}
	}

	const countryLabels = getLocaleCountryLabels(locale)

	return (
		<section
			id="contact"
			className="flex items-center justify-center bg-muted/30 py-24 md:py-32"
		>
			<div className="container px-4">
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<h2 className="font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
						{t("contactForm.contactTitle")}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						{t("contactForm.contactSubtitle")}
					</p>
				</div>
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
					<Card className="p-8">
						<CardContent className="px-0">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="mx-auto max-w-3xl space-y-8"
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
																className="h-12"
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
																className="h-12"
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
														className="resize-none"
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
										className="w-full cursor-pointer"
										disabled={form.formState.isSubmitting}
									>
										{form.formState.isSubmitting && <Spinner />}
										{t("contactForm.send")}
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>

					<div className="space-y-8">
						<div>
							<h3 className="mb-6 font-bold text-2xl">
								{t("contactInfo.title")}
							</h3>
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
										<Mail className="h-6 w-6 text-primary" />
									</div>
									<div>
										<div className="mb-1 font-semibold">
											{t("contactInfo.email")}
										</div>
										<a
											href="mailto:faceartow@gmail.com"
											className="text-muted-foreground transition-colors hover:text-primary"
										>
											{myEmailAddress}
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
										<Phone className="h-6 w-6 text-accent" />
									</div>
									<div>
										<div className="mb-1 font-semibold">
											{t("contactInfo.phone")}
										</div>
										<a
											href="tel:+41796736445"
											className="text-muted-foreground transition-colors hover:text-accent"
										>
											{phoneNumber}
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/50">
										<MapPin className="h-6 w-6 text-secondary-foreground" />
									</div>
									<div>
										<div className="mb-1 font-semibold">
											{t("contactInfo.location")}
										</div>
										<p className="text-muted-foreground">{location}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
