interface AccessibilityFeedbackEmailTemplateProps {
	email: string
	issueType: string
	pageOrElement: string
	description: string
	ip: string
}

export function AccessibilityFeedbackEmailTemplate({
	email,
	issueType,
	pageOrElement,
	description,
	ip,
}: AccessibilityFeedbackEmailTemplateProps) {
	return (
		<div>
			<h1>Accessibility Feedback Received</h1>
			<p>
				<strong>From:</strong> {email}
			</p>
			<p>
				<strong>Issue Type:</strong> {issueType}
			</p>
			<p>
				<strong>Page / Element:</strong> {pageOrElement}
			</p>
			<p>
				<strong>Description:</strong>
			</p>
			<p>{description}</p>
			<hr />
			<p>
				<small>Submitted from IP: {ip}</small>
			</p>
		</div>
	)
}
