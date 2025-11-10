'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Leaf, CheckCircle } from 'lucide-react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8 animate-fade-in-up">
                <div className="w-full max-w-2xl space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">
                            Contact Us
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl">
                            We'd love to hear from you.
                        </p>
                    </div>
                    <Card className="shadow-lg bg-green-50/50 w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Leaf className="text-primary"/>
                                Get in Touch
                            </CardTitle>
                            <CardDescription>
                                Fill out the form below and we'll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           {submitted ? (
                                <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg animate-fade-in flex flex-col items-center gap-4">
                                    <CheckCircle className="w-12 h-12" />
                                    <h3 className="text-xl font-bold">Thank you for your message!</h3>
                                    <p>We've received your submission and will get back to you shortly.</p>
                                </div>
                           ) : (
                               <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Your Name" className="shadow-sm rounded-lg" required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="your@email.com" className="shadow-sm rounded-lg" required/>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Your message..." className="shadow-sm rounded-lg" required/>
                                    </div>
                                    <Button type="submit" className="transition-transform duration-300 hover:scale-105">Send Message</Button>
                               </form>
                           )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
