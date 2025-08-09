//@ts-nocheck

"use client";
import React, { useState, useEffect } from "react"; // Add useEffect
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, CheckCircle } from "lucide-react";
import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";

const FeedbackModule = () => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [expandedRating, setExpandedRating] = useState(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();
  const baseUrl = "https://www.creativedisplay.ca";
  const currentUrl = `${baseUrl}${pathname}`;

  // Reset states when pathname changes
  useEffect(() => {
    setSelectedRating(null);
    setExpandedRating(null);
    setComment("");
    setIsSubmitted(false);
  }, [pathname]);

  const ratings = [
    {
      emoji: "😍",
      label: "Amazing",
      value: "amazing",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      message: (
        <p className="text-sm font-light text-gray-700">
          We&apos;re thrilled you had an amazing experience! We&apos;d love to
          hear what you enjoyed the most!
        </p>
      ),
    },
    {
      emoji: "😊",
      label: "Good",
      value: "good",
      color: "text-green-500",
      bgColor: "bg-green-100",
      message: (
        <p className="text-sm font-light text-gray-700">
          Thanks for the positive feedback! Let us know how we can make your
          experience even better.
        </p>
      ),
    },
    {
      emoji: "😕",
      label: "Not Great",
      value: "not-great",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
      message: (
        <p className="text-sm font-light text-gray-700">
          We&apos;re sorry to hear your experience wasn&apos;t great. Please
          share more so we can improve.
        </p>
      ),
    },
    {
      emoji: "😣",
      label: "Bad",
      value: "bad",
      color: "text-red-500",
      bgColor: "bg-red-100",
      message: (
        <div>
          <p className="text-sm font-light text-gray-700">
            We&apos;re sorry you had a bad experience. Please tell us what went
            wrong so we can make it right.
            <br />
            If you have any issues, please don&apos;t hesitate to reach out to
            us directly.
          </p>{" "}
          <Link
            className="text-blue-600 font-medium hover:underline cursor-pointer"
            href={"/contact"}
          >
            Contact us today
          </Link>
        </div>
      ),
    },
  ];

  const handleEmojiClick = (rating) => {
    if (selectedRating?.value === rating.value) {
      // Deselect if the same rating is clicked again
      setSelectedRating(null);
      setExpandedRating(null);
      setComment("");
      setIsSubmitted(false);
    } else {
      // Select new rating
      setSelectedRating(rating);
      setExpandedRating(rating.value);
      setIsSubmitted(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedRating) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: selectedRating.value,
          comment: comment.trim(),
          pageUrl: currentUrl,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setExpandedRating(null);
          setSelectedRating(null);
          setComment("");
          setIsSubmitted(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-gray-900 w-full max-w-xl">
      <div className="mx-auto p-2 flex items-center justify-center">
        <Card className="w-full transition-all duration-300 bg-white rounded-full border-none border-0 shadow-none">
          <CardHeader className="text-center p-0 m-0 mt-1 text-center border-none">
            <CardTitle className="text-lg font-semibold p-0 m-0 border-none">
              How was your experience?
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 p-2 m-0 border-none">
            {/* Emoji Rating Section */}
            <div className="flex justify-center space-x-4 border-none">
              {ratings.map((rating) => (
                <div key={rating.value} className="flex flex-col items-center">
                  <button
                    onClick={() => handleEmojiClick(rating)}
                    className={`text-md p-3 h-[50px] w-[50px] rounded-full transition-all duration-200 hover:scale-110 transform ${
                      selectedRating?.value === rating.value
                        ? `${rating.bgColor} scale-110`
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {rating.emoji}
                  </button>
                  <span
                    className={`text-sm mt-2 font-medium text-center ${
                      selectedRating?.value === rating.value
                        ? rating.color
                        : "text-gray-500"
                    }`}
                  >
                    {rating.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Expandable Feedback Section */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedRating
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 hidden"
              }`}
            >
              {expandedRating && (
                <div className="space-y-4 pt-4">
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-2 mb-1 ms-1">
                      <span className="text-lg">{selectedRating?.emoji}</span>
                      <span className="font-medium">
                        You selected:{" "}
                        <span className={selectedRating?.color}>
                          {selectedRating?.label}
                        </span>
                      </span>
                    </div>
                    <div className="mb-4 ms-1">{selectedRating?.message}</div>

                    {isSubmitted ? (
                      <Alert className="bg-green-100 rounded-full w-fit mx-auto my-2 ">
                        <div className="text-green-500 flex items-center gap-x-1 px-2 justify-center w-fit">
                          <CheckCircle className="h-4 w-4 text-green-600 " />
                          Thank you for your feedback! We appreciate it.
                        </div>
                      </Alert>
                    ) : (
                      <>
                        <Textarea
                          placeholder="Tell us more about your experience... (optional)"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="min-h-[100px] resize-none transition-all duration-200 focus:ring-2 bg-white focus:ring-blue-400"
                          maxLength={500}
                        />
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-500">
                            {comment.length}/500 characters
                          </span>

                          <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !selectedRating}
                            className="bg-black rounded-full hover:bg-gray-900 text-white transition-all duration-200 disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 mr-2"></div>
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Send
                              </>
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackModule;
