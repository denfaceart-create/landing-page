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
			<div className="container mx-auto px-4 py-6 sm:p-8 print:hidden">
				<div className="mx-auto max-w-2xl">
					<Button
						onClick={handlePrint}
						variant="default"
						className="mb-4 w-full cursor-pointer sm:mb-8"
					>
						Print QR Code
					</Button>
				</div>
			</div>

			{/* Print-friendly content */}
			<div className="flex flex-col items-center justify-center px-4 py-8 sm:px-6 md:px-8 print:min-h-screen print:p-12">
				<div className="mb-6 text-center sm:mb-8">
					<h1 className="mb-4 font-bold text-2xl text-black sm:text-3xl md:text-4xl print:text-5xl">
						{t("Manifest.name")}
					</h1>
				</div>

				<div className="mb-6 w-full max-w-[90vw] rounded-lg bg-white p-4 shadow-lg sm:mb-8 sm:max-w-md sm:p-8 md:max-w-lg md:p-12 print:shadow-none">
					{siteUrl && (
						<QRCodeSVG
							id="qr-code-svg"
							value={siteUrl}
							size={Math.min(500, window.innerWidth * 0.8)}
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
							className="h-auto w-full"
						/>
					)}
				</div>

				<div className="text-center text-black text-sm sm:text-base md:text-lg print:text-xl">
					<p className="break-all px-4 font-mono">{siteUrl}</p>
				</div>
			</div>
		</div>
	)
}
