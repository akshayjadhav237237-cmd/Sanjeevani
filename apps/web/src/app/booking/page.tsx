'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Clock, HeartPulse, User, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookingPage() {
    const [selectedType, setSelectedType] = useState('Bed');
    const [isBooked, setIsBooked] = useState(false);

    const bedTypes = [
        { name: 'ICU', available: 5, total: 20, price: '₹15,000/day' },
        { name: 'Emergency', available: 2, total: 15, price: '₹8,000/day' },
        { name: 'General Ward', available: 12, total: 50, price: '₹3,000/day' },
        { name: 'Private Room', available: 0, total: 10, price: '₹10,000/day' },
    ];

    const doctors = [
        { name: 'Dr. Sarah Smith', specialty: 'Cardiologist', experience: '12 yrs', rating: 4.9 },
        { name: 'Dr. John Doe', specialty: 'Neurologist', experience: '15 yrs', rating: 4.7 },
    ];

    if (isBooked) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6">
                    <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
                    <p className="text-muted-foreground max-w-sm mx-auto">Your ICU Bed at Apollo Hospital has been reserved. Check your dashboard for details.</p>
                    <Button onClick={() => window.location.href = '/dashboard'}>Go to Dashboard</Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/20 pb-20 pt-10 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Instant Booking</h1>
                    <p className="text-muted-foreground">Reserve beds or book doctor appointments in real-time.</p>
                </div>

                <Tabs defaultValue="Bed" className="w-full" onValueChange={setSelectedType}>
                    <TabsList className="grid w-full grid-cols-2 h-14 p-1">
                        <TabsTrigger value="Bed" className="text-lg gap-2">
                            <HeartPulse className="w-5 h-5" /> Bed Booking
                        </TabsTrigger>
                        <TabsTrigger value="Appointment" className="text-lg gap-2">
                            <User className="w-5 h-5" /> Doctor Appointment
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="Bed" className="mt-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            {bedTypes.map((bed) => (
                                <Card key={bed.name} className={`overflow-hidden border-2 transition-all ${bed.available > 0 ? 'hover:border-primary' : 'opacity-60 cursor-not-allowed'}`}>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold">{bed.name}</h3>
                                                <p className="text-sm font-bold text-primary">{bed.price}</p>
                                            </div>
                                            <Badge variant={bed.available > 5 ? 'secondary' : bed.available > 0 ? 'outline' : 'destructive'} className="h-6">
                                                {bed.available} Available
                                            </Badge>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(bed.available / bed.total) * 100}%` }}
                                                    className={`h-full ${bed.available > 5 ? 'bg-secondary' : 'bg-primary'}`}
                                                />
                                            </div>
                                            <Button
                                                className="w-full"
                                                disabled={bed.available === 0}
                                                onClick={() => setIsBooked(true)}
                                            >
                                                {bed.available > 0 ? 'Book Now' : 'Join Waitlist'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 flex gap-3 text-sm text-primary">
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                <p>In case of life-threatening emergency, please use the SOS button immediately instead of routine booking.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="Appointment" className="mt-8 space-y-6">
                        <div className="grid gap-4">
                            {doctors.map((doc) => (
                                <Card key={doc.name} className="hover:border-primary transition-all cursor-pointer">
                                    <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div className="flex gap-6 items-center flex-1">
                                            <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center">
                                                <User className="w-10 h-10 text-muted-foreground opacity-50" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">{doc.name}</h3>
                                                <p className="text-primary font-medium">{doc.specialty}</p>
                                                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.experience}</span>
                                                    <span className="flex items-center gap-1 text-yellow-600 font-bold"><CheckCircle2 className="w-3 h-3" /> {doc.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full md:w-48">
                                            <Button className="w-full" onClick={() => setIsBooked(true)}>Select Slot</Button>
                                            <Button variant="outline" className="w-full">View Profile</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
