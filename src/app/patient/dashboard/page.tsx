
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarPlus,
  FlaskConical,
  Download,
  CalendarDays,
} from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";


const appointments = [
  { id: "apt-001", date: "2024-08-15", time: "10:00 AM", doctor: "Dr. Emily Carter", type: "Cardiology Check-up" },
  { id: "apt-002", date: "2024-09-02", time: "02:30 PM", doctor: "Dr. Ben Adams", type: "Neurology Consultation" },
];

const testResults = [
  { id: "res-001", date: "2024-07-20", test: "Lipid Panel", status: "Results Available" },
  { id: "res-002", date: "2024-07-11", test: "Complete Blood Count", status: "Results Available" },
];


export default function PatientDashboardPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRequestAppointment = () => {
    if (date) {
      router.push(`/patient/book-appointment?date=${format(date, 'yyyy-MM-dd')}`);
    } else {
       router.push('/patient/book-appointment');
    }
  };


  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/patient/appointments" className="block">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Appointments
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">
                You have {appointments.length} appointments scheduled.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-8">
            <Card id="appointments" className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><CalendarPlus/>Upcoming Appointments</CardTitle>
                <CardDescription>Review your upcoming visits. <Link href="/patient/appointments" className="text-primary hover:underline">View all</Link></CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appt) => (
                      <TableRow key={appt.id} className="cursor-pointer" onClick={() => router.push(`/patient/appointments/${appt.id}`)}>
                        <TableCell>{appt.date} at {appt.time}</TableCell>
                        <TableCell>{appt.doctor}</TableCell>
                        <TableCell>{appt.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
                <Card id="results" className="scroll-mt-20">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><FlaskConical/>Test Results</CardTitle>
                     <CardDescription>View your latest lab results. <Link href="/patient/test-results" className="text-primary hover:underline">View all</Link></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        {testResults.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell>
                              <div className="font-medium">{result.test}</div>
                              <div className="text-sm text-muted-foreground">{result.date}</div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/patient/test-results/${result.id}`}><Download className="h-3 w-3 mr-2"/>View</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

            </div>
        </div>

        <div className="lg:col-span-2">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Book an Appointment</CardTitle>
              <CardDescription>Ready to schedule your next visit?</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
               <p className="text-sm text-muted-foreground p-4 text-center">Click the button below to start the booking process.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleRequestAppointment}>Request Appointment</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
