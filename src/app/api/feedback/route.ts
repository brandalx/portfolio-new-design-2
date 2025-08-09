import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { FeedbackEmailTemplate } from "@/components/FeedbackEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

function getFormattedDate() {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "America/Winnipeg",
  };
  const formatter = new Intl.DateTimeFormat("en-CA", options);
  return formatter.format(currentDate);
}

function getCurrentYear() {
  const currentDate = new Date();
  return currentDate.getFullYear();
}

const feedbackSchema = z.object({
  rating: z.string().min(1).max(20),
  comment: z.string().min(1).max(800),
  pageUrl: z.string().max(200).optional(),
});

export async function POST(request: NextRequest) {
  const formattedDate = getFormattedDate();
  const currentYear = getCurrentYear();

  try {
    const body = await request.json();
    const validatedData = feedbackSchema.parse(body);
    const { rating, comment, pageUrl } = validatedData;

    if (!rating || !comment) {
      return NextResponse.json(
        { success: false, message: "Rating and comment are required." },
        { status: 400 }
      );
    }

    const validatedRating = rating.toString().slice(0, 20);
    const validatedComment = comment.toString().slice(0, 800);
    const validatedPageUrl = pageUrl
      ? pageUrl.toString().slice(0, 200)
      : "Not provided";
    const emojiMap: { [key: string]: string } = {
      amazing: "😍",
      good: "😊",
      "not-great": "😕",
      bad: "😣",
    };
    const validatedEmoji = emojiMap[validatedRating] || "😊";

    const { data, error } = await resend.emails.send({
      from: "Feedback Form <onboarding@resend.dev>",
      to: ["brandon.nolan.wisap@gmail.com"],
      subject: `New Feedback Submission - ${validatedRating} ${validatedEmoji}`,
      react: FeedbackEmailTemplate({
        rating: validatedRating,
        comment: validatedComment,
        pageUrl: validatedPageUrl,
        emoji: validatedEmoji,
        submissionDate: formattedDate,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to send feedback email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback!",
      data,
    });
  } catch (error) {
    console.error("Error processing feedback:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Invalid feedback data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
