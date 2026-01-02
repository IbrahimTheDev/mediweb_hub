
"use client";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useAppointmentStore } from "@/store/appointment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNotificationStore } from "@/store/notifications";


const recentPatients = [
    { id: "P001", name: "John Smith", lastVisit: "2024-08-01", diagnosis: "Hypertension" },
    { id: "P004", name: "Jessica Brown", lastVisit: "2024-08-10", diagnosis: "Asthma" },
    { id: "P002", name: "Sarah Lee", lastVisit: "2024-07-22", diagnosis: "Migraine" },
];


function RescheduleDialog({ appointment, onReschedule }: { appointment: any; onReschedule: (id: string, notes: string) => void; }) {
    const [notes, setNotes] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const { toast } = useToast();

    const handleSubmit = () => {
        onReschedule(appointment.id, notes);
        toast({ title: "Reschedule request sent." });
        setIsOpen(false);
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Reschedule</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Request Reschedule</DialogTitle>
                    <DialogDescription>
                        Suggest a new time or send a message to the patient.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="text-sm"><strong>Patient:</strong> {appointment.patient}</p>
                    <p className="text-sm"><strong>Current Time:</strong> {appointment.date} at {appointment.time}</p>
                    <Textarea 
                        placeholder="e.g., 'This time is no longer available. Please select a new time slot in the afternoon.'"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Send Request</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function DoctorDashboardPage() {
  const router = useRouter();
  const { appointments, updateAppointmentStatus } = useAppointmentStore();
  const { addNotification } = useNotificationStore();
  const { toast } = useToast();


  const handleStatusUpdate = (id: string, patientId: string, patientName: string, status: "Accepted" | "Rejected" | "Reschedule_Requested", notes?: string) => {
    updateAppointmentStatus(id, status);
    
    let message = "";
    if (status === "Accepted") message = "Your appointment has been confirmed.";
    if (status === "Rejected") message = "Your appointment request was declined.";
    if (status === "Reschedule_Requested") message = `Your doctor has requested to reschedule your appointment. Reason: ${notes}`;
    
    addNotification({
        userId: patientId,
        message: message,
        type: 'status_change'
    });

    toast({
        title: `Appointment ${status.replace('_', ' ')}`,
        description: `The appointment for ${patientName} has been updated.`,
    });

  };


  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Arrived":
        return "default";
      case "Accepted":
      case "Confirmed":
        return "secondary";
      case "Pending":
      case "Reschedule_Requested":
        return "destructive";
      default:
        return "outline";
    }
  };
  
  const todaysAppointments = appointments.filter(a => a.status === "Accepted" || a.status === "Arrived");
  const pendingAppointments = appointments.filter(a => a.status === "Pending");


  return (
    <Tabs defaultValue="appointments" className="space-y-4">
      <TabsList>
        <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
        <TabsTrigger value="pending">Pending Requests</TabsTrigger>
        <TabsTrigger value="patients">Recent Patients</TabsTrigger>
        <TabsTrigger value="prescriptions" onClick={() => router.push('/doctor/prescriptions/new')}>Digital Prescription</TabsTrigger>
      </TabsList>

      <TabsContent value="appointments">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Today's Appointments</CardTitle>
            <CardDescription>
              A list of your scheduled appointments for today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Reason for Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todaysAppointments.map((appt) => (
                  <TableRow key={appt.time}>
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pending">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Pending Requests</CardTitle>
            <CardDescription>
              Review and respond to new appointment requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingAppointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell>{appt.date} at {appt.time}</TableCell>
                    <TableCell>{appt.patient}</TableCell>
                    <TableCell>{appt.reason}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="secondary" onClick={() => handleStatusUpdate(appt.id, appt.patientId, appt.patient, "Accepted")}>Approve</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleStatusUpdate(appt.id, appt.patientId, appt.patient, "Rejected")}>Decline</Button>
                        <RescheduleDialog 
                            appointment={appt} 
                            onReschedule={(id, notes) => handleStatusUpdate(id, appt.patientId, appt.patient, "Reschedule_Requested", notes)} 
                        />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="patients">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Patients</CardTitle>
            <CardDescription>
              A list of patients you have recently seen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Last Visit</TableHead>
                   <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                     <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                           <Link href={`/doctor/patient-chart/${patient.id}`}>View Chart</Link>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="prescriptions">
        {/* This content will not be shown as the tab trigger navigates away */}
      </TabsContent>
    </Tabs>
  );
}
