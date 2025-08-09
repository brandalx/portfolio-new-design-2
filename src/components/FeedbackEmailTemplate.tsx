import * as React from "react";

interface FeedbackEmailTemplateProps {
  rating: string;
  comment: string;
  pageUrl: string;
  emoji: string;
  submissionDate: string;
}

export function FeedbackEmailTemplate({
  rating,
  comment,
  pageUrl,
  emoji,
  submissionDate,
}: FeedbackEmailTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h1 style={{ color: "#333" }}>New Feedback Submission</h1>
      <p>Hello,</p>
      <p>You have received new feedback from your website:</p>

      <h2 style={{ color: "#444" }}>Feedback Details</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <strong>Rating:</strong> {rating} {emoji}
        </li>
        <li>
          <strong>Submission Date:</strong> {submissionDate}
        </li>
        <li>
          <strong>Page URL:</strong> {pageUrl}
        </li>
      </ul>

      <h2 style={{ color: "#444" }}>Comment</h2>
      <p
        style={{ background: "#f9f9f9", padding: "1rem", borderRadius: "4px" }}
      >
        {comment}
      </p>

      <hr style={{ border: "1px solid #eee", margin: "2rem 0" }} />
      <p style={{ color: "#666", fontSize: "12px" }}>
        This email was sent from your website&apos;s feedback form.
      </p>
    </div>
  );
}
