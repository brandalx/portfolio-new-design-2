import * as React from "react";

interface EmailTemplateProps {
  email: string;
  subject: string;
  message: string;
}

export function EmailTemplate({ email, subject, message }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h1 style={{ color: "#333" }}>New Contact Form Submission</h1>
      <p>Hello,</p>
      <p>You have received a new message from your website contact form:</p>

      <h2 style={{ color: "#444" }}>Contact Details</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Email:</strong> {email}
        </li>
        <li>
          <strong>Subject:</strong> {subject}
        </li>
      </ul>

      <h2 style={{ color: "#444" }}>Message</h2>
      <p
        style={{ background: "#f9f9f9", padding: "1rem", borderRadius: "4px" }}
      >
        {message}
      </p>

      <p style={{ marginTop: "2rem" }}>
        You can reply directly to this email to contact the sender.
      </p>

      <hr style={{ border: "1px solid #eee", margin: "2rem 0" }} />
      <p style={{ color: "#666", fontSize: "12px" }}>
        This email was sent from your website&apos;s contact form.
      </p>
    </div>
  );
}
