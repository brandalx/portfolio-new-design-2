import { EmailTemplate } from "@/components/emailTemplate";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().min(2).max(50),
  phoneNumber: z.string().min(2).max(20).optional(),
  details: z.string().min(2).max(500),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = formSchema.parse(body);

    // Check honeypot
    if (validatedData.honeypot) {
      return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Contact Form New Portfolio <onboarding@resend.dev>",
      to: ["brandon.nolan.wisap@gmail.com"],
      subject: `New Contact Form Submission from ${validatedData.firstName} ${validatedData.lastName}`,
      replyTo: validatedData.email,
      react: EmailTemplate({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber || "N/A",
        details: validatedData.details,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    if (error instanceof z.ZodError) {
      return Response.json({ status: 400 });
    }
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
