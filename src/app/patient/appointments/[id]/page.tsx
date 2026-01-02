
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, Stethoscope, User } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const appointmentDetails = {
    id: "apt-001",
    date: "August 15, 2024",
    time: "10:00 AM",
    doctor: "Dr. Emily Carter",
    specialty: "Cardiology",
    reason: "Cardiology Check-up",
    clinic: "MediWeb Hub - Downtown Clinic",
    address: "123 Health St, Wellness City, 45678",
    instructions: "Please arrive 15 minutes early and bring a list of your current medications. Fasting is not required for this visit."
};


export default function AppointmentDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch appointment details using params.id
  const { date, time, doctor, specialty, reason, clinic, address, instructions } = appointmentDetails;
  const { toast } = useToast();
  const router = useRouter();

  const handleCancelAppointment = () => {
    // In a real app, you would also make an API call to cancel the appointment
    toast({
      title: "Appointment Canceled",
      description: "Your appointment has been successfully canceled.",
    });
    router.push("/patient/appointments");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Appointment Details</CardTitle>
          <CardDescription>
            Details for your upcoming appointment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="mr-3 mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Date</p>
                  <p className="text-muted-foreground">{date}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="mr-3 mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Time</p>
                  <p className="text-muted-foreground">{time}</p>
                </div>
              </div>
              <div className="flex items-start">
                <User className="mr-3 mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Doctor</p>
                  <p className="text-muted-foreground">{doctor}</p>
                </div>
              </div>
               <div className="flex items-start">
                <Stethoscope className="mr-3 mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Specialty</p>
                  <p className="text-muted-foreground">{specialty}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
               <div className="flex items-start">
                <MapPin className="mr-3 mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-muted-foreground">{clinic}</p>
                  <p className="text-muted-foreground">{address}</p>
                </div>
              </div>
               <div>
                  <p className="font-semibold mb-2">Reason for Visit</p>
                  <p className="text-muted-foreground">{reason}</p>
              </div>
            </div>
          </div>
          <Separator />
           <div>
            <h3 className="text-lg font-headline font-semibold mb-2">Check-in Instructions</h3>
            <p className="text-muted-foreground text-sm">{instructions}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently cancel your appointment.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Go Back</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelAppointment} className="bg-destructive hover:bg-destructive/90">
                    Yes, Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button>Reschedule</Button>
        </CardFooter>
      </Card>
      <div className="mt-4 text-center">
        <Button variant="link" asChild>
          <Link href="/patient/appointments">← Back to all appointments</Link>
        </Button>
      </div>
    </div>
  );
}
