"use client"

import { useTranslations } from "next-intl"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function QRCodeClient() {
	const t = useTranslations()
	const [siteUrl, setSiteUrl] = useState("")

	useEffect(() => {
		if (typeof window !== "undefined") {
			const url = window.location.origin
			setSiteUrl(url)
		}
	}, [])

	const handlePrint = () => {
		window.print()
	}

	return (
		<div className="min-h-screen bg-white print:bg-white">
			{/* Hide on print */}
			<div className="container mx-auto p-8 print:hidden">
				<div className="mx-auto max-w-2xl">
					<Button
						onClick={handlePrint}
						variant="default"
						className="mb-8 w-full cursor-pointer"
					>
						Print QR Code
					</Button>
				</div>
			</div>

			{/* Print-friendly content */}
			<div className="flex flex-col items-center justify-center print:min-h-screen print:p-12">
				<div className="mb-8 text-center">
					<h1 className="mb-4 font-bold text-4xl print:text-5xl">
						{t("Manifest.name")}
					</h1>
				</div>

				<div className="mb-8 rounded-lg bg-white p-12 shadow-lg print:shadow-none">
					{siteUrl && (
						<QRCodeSVG
							id="qr-code-svg"
							value={siteUrl}
							size={500}
							level="H"
							marginSize={2}
							fgColor="#000000"
							bgColor="#ffffff"
							imageSettings={{
								src: "/logo.png",
								x: 23,
								y: 23,
								height: 60,
								width: 60,
								excavate: true,
							}}
						/>
					)}
				</div>

				<div className="text-center text-gray-700 text-lg print:text-xl">
					<p className="font-mono">{siteUrl}</p>
				</div>
			</div>
		</div>
	)
}
