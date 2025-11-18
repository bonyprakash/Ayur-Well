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
        // In a real app, you would handle form submission here (e.g., API call)
        setSubmitted(true);
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
                <div className="w-full max-w-2xl space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            Get in Touch
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl">
                            Have questions or feedback? We'd love to hear from you.
                        </p>
                    </div>
                    <Card className="shadow-lg w-full bg-green-50/50 rounded-2xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                <Leaf className="text-primary"/>
                                Send us a Message
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                           {submitted ? (
                                <div className="text-center p-8 bg-green-100 text-green-700 rounded-lg animate-fade-in flex flex-col items-center gap-4">
                                    <CheckCircle className="w-16 h-16 text-primary" />
                                    <h3 className="text-xl font-bold">Thank you for your message!</h3>
                                    <p>We've received your submission and will get back to you shortly.</p>
                                    <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-4">Send another message</Button>
                                </div>
                           ) : (
                               <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Your Name" className="shadow-md rounded-xl" required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="your.name@example.com" className="shadow-md rounded-xl" required/>
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Your message..." className="shadow-md rounded-xl min-h-[120px]" required/>
                                    </div>
                                    <Button type="submit" className="w-full sm:w-auto gradient-button text-white transition-transform duration-300 hover:scale-105 shadow-lg">Send Message</Button>
                               </form>
                           )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
