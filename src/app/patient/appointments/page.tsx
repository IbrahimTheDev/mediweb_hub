
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
import { useAppointmentStore } from "@/store/appointment";
import { Badge } from "@/components/ui/badge";


export default function AppointmentsPage() {
  const router = useRouter();
  const { appointments } = useAppointmentStore();
  
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Accepted":
      case "Confirmed":
        return "default";
      case "Completed":
        return "secondary";
      case "Pending":
        return "outline";
      case "Reschedule_Requested":
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };


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
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow key={appt.id} >
                <TableCell>{appt.date}</TableCell>
                <TableCell>{appt.time}</TableCell>
                <TableCell>{appt.doctor}</TableCell>
                <TableCell>{appt.reason}</TableCell>
                <TableCell>
                    <Badge variant={getBadgeVariant(appt.status)}>{appt.status.replace(/_/g, ' ')}</Badge>
                </TableCell>
                <TableCell className="text-right">
                    {appt.status === "Reschedule_Requested" ? (
                        <Button variant="secondary" size="sm" onClick={() => router.push(`/patient/book-appointment?reschedule=true&date=${appt.date}`)}>Select New Time</Button>
                    ) : (
                         <Button variant="outline" size="sm" onClick={() => router.push(`/patient/appointments/${appt.id}`)} disabled={appt.status !== "Accepted" && appt.status !== "Completed"}>View Details</Button>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

    