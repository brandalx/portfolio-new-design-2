"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBrandTelegram } from "@tabler/icons-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name is required" })
    .max(50, { message: "First Name is too long" }),
  lastName: z
    .string()
    .min(2, { message: "Last Name is required" })
    .max(50, { message: "Last Name is too long" }),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(2, { message: "Email is required" })
    .max(50, { message: "Email is too long" }),
  phoneNumber: z
    .string()
    .min(2, { message: "Phone Number is required" })
    .max(20, { message: "Phone Number is too long" })
    .optional(),
  details: z
    .string()
    .min(2, { message: "Details are required" })
    .max(500, { message: "Details are too long" }),
  honeypot: z.string().optional(),
});

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      details: "",
      honeypot: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      if (values.honeypot) {
        return;
      }

      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("Message sent successfully.", {
          duration: 5000,
        });
        setLoading(false);
        form.reset();
      } else {
        setLoading(false);
        toast.error("Failed to send the form. Please try again.", {
          duration: 5000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send the form. Please try again.", {
        duration: 5000,
      });
    }
  }

  return (
    <main className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-2xl lg:max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl glor-b">
            Get In Touch
          </h1>
          <p className="text-muted-foreground mt-3 glor-l">
            I&apos;d love to talk about how we can work together.
          </p>
        </div>
        <div className="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm p-0">
            <div className="p-6">
              <h2 className="mb-8 text-xl font-semibold glor-b">
                Fill in the form
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@domain.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1 (234)-567-8910"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Details*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message..."
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="honeypot"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="mt-4 grid">
                    <Button disabled={loading} type="submit" className="w-full">
                      {loading ? (
                        <>
                          <Loader2 className="h-4 mr-1 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <div className="flex items-center gap-x-2">
                          {" "}
                          <p>Send inquiry </p>
                          <IconBrandTelegram className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-muted-foreground text-sm">
                      I&apos;ll get back to you in 1-2 business days.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <div className="divide-y divide-border">
            {/* 
    <div className="flex gap-x-7 py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin text-muted-foreground mt-1.5 size-6"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <h3 className="font-semibold">Our address</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  We're here to help with any questions or code.
                </p>
                <address className="text-muted-foreground mt-2 text-sm not-italic">
                  300 Bath Street, Tay House
                  <br />
                  Glasgow G2 4JR, United Kingdom
                </address>
              </div>
            </div> */}

            <div className="flex gap-x-7 py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail text-muted-foreground mt-1.5 size-6"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <div>
                <h3 className="font-semibold">Email me</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  I&apos;ll get back to you as soon as possible.
                </p>
                <p className="mt-2">
                  <a
                    className="text-primary text-sm font-medium hover:underline"
                    href="mailto:brandon.nolan.wisap@gmail.com"
                  >
                    brandon.nolan.wisap@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex gap-x-7 py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-phone text-muted-foreground mt-1.5 size-6"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <h3 className="font-semibold">Call Me</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Mon-Fri from 8am to 5pm Central Standard Time
                </p>
                <p className="mt-2">
                  <a
                    className="text-primary text-sm font-medium hover:underline"
                    href="tel:+4374393888"
                  >
                    +1 (437) 439-38888
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
