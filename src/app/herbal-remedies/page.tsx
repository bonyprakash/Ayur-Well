'use client';

import { Header } from '@/components/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function HerbalRemediesPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1 flex-col items-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-4xl space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline">
                            Herbal Remedies
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl">
                            Discover the healing power of nature.
                        </p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Coming Soon</CardTitle>
                            <CardDescription>
                                Our comprehensive guide to herbal remedies is currently being cultivated. Please check back soon!
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <p>We are working hard to bring you a detailed library of herbs and their uses in natural healing.</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
