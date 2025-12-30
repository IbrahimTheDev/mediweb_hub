
"use client";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import { useRouter } from "next/navigation";


const appointments = [
  { id: "apt-001", date: "2024-08-15", time: "10:00 AM", doctor: "Dr. Emily Carter", type: "Cardiology Check-up", status: "Upcoming" },
  { id: "apt-002", date: "2024-09-02", time: "02:30 PM", doctor: "Dr. Ben Adams", type: "Neurology Consultation", status: "Upcoming" },
  { id: "apt-003", date: "2024-07-10", time: "09:00 AM", doctor: "Dr. Olivia Chen", type: "Pediatric Follow-up", status: "Completed" },
  { id: "apt-004", date: "2024-06-20", time: "11:00 AM", doctor: "Dr. Emily Carter", type: "Annual Physical Exam", status: "Completed" },
];

export default function AppointmentsPage() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-headline">My Appointments</CardTitle>
          <CardDescription>
            View your upcoming and past appointments.
          </CardDescription>
        </div>
        <Button asChild>
          <Link href="/patient/book-appointment">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Book Appointment
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id} className="cursor-pointer" onClick={() => router.push(`/patient/appointments/${appt.id}`)}>
                <TableCell>{appt.date}</TableCell>
                <TableCell>{appt.time}</TableCell>
                <TableCell>{appt.doctor}</TableCell>
                <TableCell>{appt.type}</TableCell>
                <TableCell>{appt.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
