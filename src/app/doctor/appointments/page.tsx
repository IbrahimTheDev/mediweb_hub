
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";

const allAppointments = [
  // Upcoming
  { patientId: "P001", date: "2024-09-15", time: "09:00 AM", patient: "John Smith", reason: "Follow-up", status: "Confirmed" },
  { patientId: "P002", date: "2024-09-16", time: "10:00 AM", patient: "Sarah Lee", reason: "New Patient Consultation", status: "Confirmed" },
  // Today
  { patientId: "P003", date: "2024-09-12", time: "11:30 AM", patient: "Michael Johnson", reason: "Annual Check-up", status: "Arrived" },
  { patientId: "P004", date: "2024-09-12", time: "01:00 PM", patient: "Jessica Brown", reason: "Follow-up", status: "Pending" },
  // Past
  { patientId: "P005", date: "2024-09-10", time: "02:30 PM", patient: "David William", reason: "Pre-op Assessment", status: "Completed" },
  { patientId: "P001", date: "2024-08-01", time: "09:00 AM", patient: "John Smith", reason: "Initial Consultation", status: "Completed" },
];


export default function DoctorAppointmentsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Arrived":
        return "default";
      case "Confirmed":
        return "secondary";
      case "Pending":
        return "destructive";
      case "Completed":
        return "outline";
      default:
        return "outline";
    }
  };

  const filteredAppointments = date
    ? allAppointments.filter(
        (appt) => new Date(appt.date).toDateString() === date.toDateString()
      )
    : allAppointments;

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Select a Date</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
            </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Appointments</CardTitle>
            <CardDescription>
              {date ? `Appointments for ${date.toLocaleDateString()}` : "All Appointments"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appt) => (
                    <TableRow key={`${appt.patientId}-${appt.date}`}>
                      <TableCell className="font-medium">{appt.time}</TableCell>
                      <TableCell>{appt.patient}</TableCell>
                      <TableCell>{appt.reason}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(appt.status)}>
                          {appt.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                           <Link href={`/doctor/patient-chart/${appt.patientId}`}>View Chart</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      No appointments for this date.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
