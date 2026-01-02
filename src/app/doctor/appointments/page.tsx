
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";


type Appointment = {
  patientId: string;
  date: string;
  time: string;
  patient: string;
  reason: string;
  status: "Confirmed" | "Arrived" | "Pending" | "Completed";
};

const initialAppointments: Appointment[] = [
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

const AppointmentTable = ({ 
    appointments, 
    searchTerm,
    onStatusChange
}: { 
    appointments: Appointment[], 
    searchTerm: string,
    onStatusChange: (appointmentToUpdate: Appointment, newStatus: Appointment['status']) => void;
}) => {
    
    const filteredAppointments = appointments.filter(appt =>
        appt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appt.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const getBadgeVariant = (status: string) => {
        switch (status) {
        case "Arrived": return "default";
        case "Confirmed": return "secondary";
        case "Pending": return "destructive";
        case "Completed": return "outline";
        default: return "outline";
        }
    };
    
    const statusOptions: Appointment['status'][] = ["Confirmed", "Arrived", "Pending", "Completed"];

    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Date</TableHead>
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
                    <TableRow key={`${appt.patientId}-${appt.date}-${appt.time}`}>
                    <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{appt.time}</TableCell>
                    <TableCell>{appt.patient}</TableCell>
                    <TableCell>{appt.reason}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Badge variant={getBadgeVariant(appt.status)} className="pointer-events-none">
                                        {appt.status}
                                    </Badge>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {statusOptions.map(status => (
                                    <DropdownMenuItem 
                                        key={status} 
                                        onSelect={() => onStatusChange(appt, status)}
                                        disabled={appt.status === status}
                                    >
                                        {status}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                    <TableCell colSpan={6} className="text-center h-24">
                    No appointments found.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
        </Table>
    )
}


export default function DoctorAppointmentsPage() {
    const [allAppointments, setAllAppointments] = React.useState<Appointment[]>(initialAppointments);
    const [searchTerm, setSearchTerm] = React.useState("");

    // In a real app, you would use a state management solution to get the current date
    const [today, setToday] = React.useState(new Date("2024-09-12"));
    
    const handleStatusChange = (appointmentToUpdate: Appointment, newStatus: Appointment['status']) => {
        setAllAppointments(currentAppointments => 
            currentAppointments.map(appt => 
                (appt.patientId === appointmentToUpdate.patientId && appt.date === appointmentToUpdate.date && appt.time === appointmentToUpdate.time) 
                ? { ...appt, status: newStatus } 
                : appt
            )
        );
    };

    const upcomingAppointments = allAppointments.filter(appt => new Date(appt.date) > today);
    const todaysAppointments = allAppointments.filter(appt => new Date(appt.date).toDateString() === today.toDateString());
    const pastAppointments = allAppointments.filter(appt => new Date(appt.date) < today);

  return (
    <Card>
        <CardHeader>
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <CardTitle className="font-headline">All Appointments</CardTitle>
                    <CardDescription>
                        View and manage all patient appointments.
                    </CardDescription>
                </div>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search appointments..." 
                        className="pl-8" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="upcoming">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <AppointmentTable appointments={upcomingAppointments} searchTerm={searchTerm} onStatusChange={handleStatusChange} />
                </TabsContent>
                <TabsContent value="today">
                    <AppointmentTable appointments={todaysAppointments} searchTerm={searchTerm} onStatusChange={handleStatusChange} />
                </TabsContent>
                <TabsContent value="past">
                    <AppointmentTable appointments={pastAppointments} searchTerm={searchTerm} onStatusChange={handleStatusChange} />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
}
