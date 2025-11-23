interface ContactMeEmailTemplateProps {
	name: string
	email: string
	phone: string
	message: string
	ip: string
}

export function ContactMeEmailTemplate({
	name,
	email,
	phone,
	message,
	ip,
}: ContactMeEmailTemplateProps) {
	return (
		<div>
			<h1>Hey beautiful, you got a new contact request!</h1>
			<p>
				<strong>From:</strong> {name}
			</p>
			<p>
				<strong>Email:</strong> {email}
			</p>
			<p>
				<strong>Phone:</strong> {phone}
			</p>
			<p>
				<strong>Message:</strong>
			</p>
			<p>{message.replace(/\n/g, "<br>")}</p>
			<hr />
			<p>
				<small>Submitted from IP: {ip}</small>
			</p>
		</div>
	)
}
