"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  ClipboardPlus,
} from "lucide-react";

// Stores
import { useUserStore } from "@/store/user";
import { usePrescriptionStore } from "@/store/prescriptions";
import { useAppointmentStore } from "@/store/appointment";

// Mock data for test results (keep until you build a Test Result store/table)
const testResults = [
  { id: "res-001", date: "2024-07-20", test: "Lipid Panel", status: "Results Available" },
  { id: "res-002", date: "2024-07-11", test: "Complete Blood Count", status: "Results Available" },
];

export default function PatientDashboardPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const { prescriptions } = usePrescriptionStore();
  const { appointments, fetchAppointments, subscribeToAppointments } = useAppointmentStore();

  React.useEffect(() => {
    if (user?.id) {
        // Fetch appointments where user is the patient
        fetchAppointments(user.id, 'patient');
        subscribeToAppointments(user.id, 'patient');
    }
  }, [user?.id, fetchAppointments, subscribeToAppointments]);

  // Filters
  const patientPrescriptions = prescriptions.filter(p => p.patientId === user?.id || p.patient === user?.name).slice(0, 2);
  const upcomingAppointments = appointments.filter(a => a.status !== 'Rejected' && a.status !== 'Completed').slice(0, 3); // Show top 3

  if (!user) {
      return <div className="p-8">Please log in to view dashboard.</div>;
  }

  return (
     <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gradient-to-br from-primary/20 to-transparent">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Welcome back, {user.name.split(' ')[0]}!</CardTitle>
                    <CardDescription>Here's a summary of your health dashboard. You have {upcomingAppointments.length} upcoming appointments.</CardDescription>
                </CardHeader>
            </Card>
            
            <Card id="appointments" className="scroll-mt-20">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline flex items-center gap-2"><CalendarDays/>Upcoming Appointments</CardTitle>
                    <CardDescription>Review your upcoming visits.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/patient/appointments">View all <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAppointments.length > 0 ? (
                        upcomingAppointments.map((appt) => (
                        <TableRow key={appt.id} className="cursor-pointer" onClick={() => router.push(`/patient/appointments/${appt.id}`)}>
                            <TableCell>{appt.date} at {appt.time}</TableCell>
                            <TableCell>{appt.doctorName}</TableCell>
                            <TableCell>{appt.status}</TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground">No upcoming appointments.</TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card id="prescriptions" className="scroll-mt-20">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline flex items-center gap-2"><ClipboardPlus/>Recent Prescriptions</CardTitle>
                    <CardDescription>Review your recent prescriptions.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/patient/prescriptions">View all <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                    <TableBody>
                    {patientPrescriptions.length > 0 ? (
                        patientPrescriptions.map((presc) => (
                            <TableRow key={presc.id}>
                            <TableCell>
                                <div className="font-medium">{presc.medications.map(m => m.medication).join(', ')}</div>
                                <div className="text-sm text-muted-foreground">Issued on {presc.date} by {presc.doctor}</div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/patient/prescriptions/${presc.id}`}>View</Link>
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={2} className="text-center text-muted-foreground">No recent prescriptions.</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card id="results" className="scroll-mt-20">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline flex items-center gap-2"><FlaskConical/>Recent Test Results</CardTitle>
                        <CardDescription>View your latest lab results.</CardDescription>
                    </div>
                     <Button variant="ghost" size="sm" asChild>
                        <Link href="/patient/test-results">View all <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
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

        <div className="lg:col-span-1 space-y-8">
           <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="font-headline">Book an Appointment</CardTitle>
                    <CardDescription>Ready to schedule your next visit? Click the button below to start.</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full" onClick={() => router.push('/patient/book-appointment')}>
                        <CalendarPlus className="mr-2"/>
                        Request Appointment
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
  );
}