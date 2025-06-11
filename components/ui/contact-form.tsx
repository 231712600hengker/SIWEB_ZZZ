/* eslint-disable react/no-unescaped-entities */
'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Send us a Message</CardTitle>
        <p className="text-blue-100">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const firstName = (form as any).firstName.value;
            const lastName = (form as any).lastName.value;
            const email = (form as any).email.value;
            const phone = (form as any).phone.value;
            const subject = (form as any).subject.value;
            const message = (form as any).message.value;

            if (!firstName || !email || !message) {
              alert("Please fill in at least your First Name, Email, and Message.");
              return;
            }

            const text = `Hello, my name is ${firstName} ${lastName}%0AEmail: ${email}%0APhone: ${phone}%0ASubject: ${subject}%0AMessage: ${message}`;
            const phoneNumber = "6287874289382";
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank");
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-gray-700 font-semibold">First Name</Label>
              <Input id="firstName" placeholder="John" className="mt-2 border-2 focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-700 font-semibold">Last Name</Label>
              <Input id="lastName" placeholder="Doe" className="mt-2 border-2 focus:border-blue-500 transition-colors" />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" className="mt-2 border-2 focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2 border-2 focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <Label htmlFor="subject" className="text-gray-700 font-semibold">Subject</Label>
            <Input id="subject" placeholder="How can we help you?" className="mt-2 border-2 focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <Label htmlFor="message" className="text-gray-700 font-semibold">Message</Label>
            <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} className="mt-2 border-2 focus:border-blue-500 transition-colors" />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg py-3">
            <Send className="mr-2 h-5 w-5" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
