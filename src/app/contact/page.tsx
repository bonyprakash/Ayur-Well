'use client';

import { Header } from '@/components/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-2xl space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">
                            Contact Us
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl">
                            We'd love to hear from you.
                        </p>
                    </div>
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Get in Touch</CardTitle>
                            <CardDescription>
                                Fill out the form below and we'll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="your@email.com" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Your message..." />
                                </div>
                                <Button type="submit">Send Message</Button>
                           </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
