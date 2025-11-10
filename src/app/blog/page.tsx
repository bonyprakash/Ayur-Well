'use client';

import { Header } from '@/components/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function BlogPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-4xl space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">
                            NaturaLife Blog
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl">
                            Insights and articles on natural wellness.
                        </p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Our blog is coming soon!</CardTitle>
                            <CardDescription>
                                We're preparing insightful articles for you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p>Stay tuned for posts on nutrition, naturopathy, and mindful living.</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
