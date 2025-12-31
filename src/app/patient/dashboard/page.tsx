
"use client";

import Link from "next/link";
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
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
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
  const router = useRouter();

  return (
     <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gradient-to-br from-primary/20 to-transparent">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Welcome back, Jane!</CardTitle>
                    <CardDescription>Here's a summary of your health dashboard. You have {appointments.length} upcoming appointments.</CardDescription>
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
