
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Calendar, Clock, Stethoscope, Briefcase, FileText } from "lucide-react";
import { useAppointmentStore } from "@/store/appointment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmationPage() {
    const { appointment } = useAppointmentStore();
    const router = useRouter();

    useEffect(() => {
        if (!appointment) {
            router.replace('/patient/dashboard');
        }
    }, [appointment, router]);


    if (!appointment) {
        return null;
    }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-green-500 border-2">
        <CardHeader className="items-center text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="font-headline text-3xl">Appointment Requested!</CardTitle>
          <CardDescription>
            Your appointment has been successfully requested. Please check your dashboard for confirmation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-lg">Appointment Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3">
                        <Briefcase className="h-5 w-5 text-primary mt-0.5"/>
                        <div>
                            <p className="font-semibold">Service</p>
                            <p className="text-muted-foreground">{appointment.service}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Stethoscope className="h-5 w-5 text-primary mt-0.5"/>
                        <div>
                            <p className="font-semibold">Doctor</p>
                            <p className="text-muted-foreground">{appointment.doctor}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5"/>
                        <div>
                            <p className="font-semibold">Date</p>
                            <p className="text-muted-foreground">{new Date(appointment.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5"/>
                        <div>
                            <p className="font-semibold">Time</p>
                            <p className="text-muted-foreground">{appointment.time}</p>
                        </div>
                    </div>
                </div>
                 {appointment.notes && (
                    <div className="flex items-start gap-3 pt-4 border-t">
                        <FileText className="h-5 w-5 text-primary mt-0.5"/>
                        <div>
                            <p className="font-semibold">Additional Notes</p>
                            <p className="text-muted-foreground">{appointment.notes}</p>
                        </div>
                    </div>
                 )}
            </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/patient/dashboard">Go to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

    