"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { useTranslations } from "next-intl"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Label } from "./ui/label"

export function Contact() {
	const t = useTranslations("HomePage.contact")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Form submitted:", formData)
		alert("Merci!")
		setFormData({ name: "", email: "", phone: "", message: "" })

		// Simulate form submission
		setIsSubmitting(true)
		setTimeout(() => {
			setIsSubmitting(false)
		}, 2000)
	}

	return (
		<section
			id="contact"
			className="flex items-center justify-center bg-muted/30 py-24 md:py-32"
		>
			<div className="container px-4">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<h2 className="font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
						{t("contactTitle")}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						{t("contactSubtitle")}
					</p>
				</div>
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
					<Card className="p-8">
						<CardHeader>
							<CardTitle className="text-2xl">{t("contactTitle")}</CardTitle>
							<CardDescription>{t("contactSubtitle")}</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="name">{t("name")}</Label>
										<Input
											id="name"
											placeholder={t("name")}
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											required
											className="h-12"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">{t("email")}</Label>
										<Input
											id="email"
											type="email"
											placeholder={t("email")}
											value={formData.email}
											onChange={(e) =>
												setFormData({ ...formData, email: e.target.value })
											}
											required
											className="h-12"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="phone">{t("phone")}</Label>

									<Input
										id="phone"
										type="tel"
										placeholder={t("phone")}
										value={formData.phone}
										onChange={(e) =>
											setFormData({ ...formData, phone: e.target.value })
										}
										className="h-12"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="message">{t("message")}</Label>

									<Textarea
										id="message"
										placeholder={"Tell us about your event..."}
										value={formData.message}
										onChange={(e) =>
											setFormData({ ...formData, message: e.target.value })
										}
										required
										rows={6}
										className="resize-none"
									/>
								</div>
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Sending..." : t("send")}
								</Button>
							</form>
						</CardContent>
					</Card>

					<div className="space-y-8">
						<div>
							<h3 className="mb-6 font-bold text-2xl">Contact Information</h3>
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
										<Mail className="h-6 w-6 text-primary" />
									</div>
									<div>
										<div className="mb-1 font-semibold">{t("email")}</div>
										<a
											href="mailto:faceartow@gmail.com"
											className="text-muted-foreground transition-colors hover:text-primary"
										>
											faceartow@gmail.com
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
										<Phone className="h-6 w-6 text-accent" />
									</div>
									<div>
										<div className="mb-1 font-semibold">Phone</div>
										<a
											href="tel:+41796736445"
											className="text-muted-foreground transition-colors hover:text-accent"
										>
											079 673 64 45
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/50">
										<MapPin className="h-6 w-6 text-secondary-foreground" />
									</div>
									<div>
										<div className="mb-1 font-semibold">Location</div>
										<p className="text-muted-foreground">
											Sarnen, Obwalden, Switzerland
										</p>
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
