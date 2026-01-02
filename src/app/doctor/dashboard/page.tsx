"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Stores
import { useAppointmentStore, type AppointmentStatus } from "@/store/appointment";
import { useNotificationStore } from "@/store/notifications";
import { useUserStore } from "@/store/user";
import { Loader2 } from "lucide-react";

// Helper component for Rescheduling
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
                        Send a message to the patient requesting them to choose a new time.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="text-sm"><strong>Patient:</strong> {appointment.patientName}</p>
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
  const { toast } = useToast();
  
  // Connect to Stores
  const { user } = useUserStore();
  const { 
    appointments, 
    updateAppointmentStatus, 
    fetchAppointments, 
    subscribeToAppointments,
    isLoading 
  } = useAppointmentStore();
  const { addNotification } = useNotificationStore();

  // Initial Data Fetch & Realtime Subscription
  React.useEffect(() => {
    if (user?.id) {
        fetchAppointments(user.id, 'doctor');
        subscribeToAppointments(user.id, 'doctor');
    }
  }, [user?.id, fetchAppointments, subscribeToAppointments]);

  const handleStatusUpdate = (id: string, patientId: string, patientName: string, status: AppointmentStatus, notes?: string) => {
    updateAppointmentStatus(id, status);
    
    let message = "";
    if (status === "Accepted") message = "Your appointment has been confirmed.";
    if (status === "Rejected") message = "Your appointment request was declined.";
    if (status === "Reschedule_Requested") message = `Your doctor has requested to reschedule. Note: ${notes || 'Please select a new time.'}`;
    
    if(message) {
      addNotification({
          userId: patientId,
          message: message,
          type: 'status_change'
      });
    }

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
  
  // Filter appointments based on loaded data
  const todaysDate = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter(a => 
    (a.date === todaysDate) && (a.status === "Accepted" || a.status === "Arrived")
  );
  const pendingAppointments = appointments.filter(a => a.status === "Pending");
  
  // Derive recent patients from appointment history (Simple implementation)
  const uniquePatientIds = Array.from(new Set(appointments.map(a => a.patientId))).slice(0, 5);
  const recentPatients = uniquePatientIds.map(id => {
      const appt = appointments.find(a => a.patientId === id);
      return {
          id: id,
          name: appt?.patientName || 'Unknown',
          lastVisit: appt?.date || 'N/A',
      };
  });

  if (isLoading && appointments.length === 0) {
      return <div className="flex w-full h-full items-center justify-center p-10"><Loader2 className="animate-spin h-8 w-8 text-primary"/></div>;
  }

  return (
    <Tabs defaultValue="appointments" className="space-y-4">
      <TabsList>
        <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
        <TabsTrigger value="pending">Pending Requests <Badge className="ml-2">{pendingAppointments.length}</Badge></TabsTrigger>
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
                {todaysAppointments.length > 0 ? (
                    todaysAppointments.map((appt) => (
                    <TableRow key={appt.id}>
                        <TableCell className="font-medium">{appt.time}</TableCell>
                        <TableCell>{appt.patientName}</TableCell>
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
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No appointments scheduled for today.
                        </TableCell>
                    </TableRow>
                )}
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
                {pendingAppointments.length > 0 ? (
                  pendingAppointments.map((appt) => (
                    <TableRow key={appt.id}>
                      <TableCell>{appt.date} at {appt.time}</TableCell>
                      <TableCell>{appt.patientName}</TableCell>
                      <TableCell>{appt.reason}</TableCell>
                      <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="secondary" onClick={() => handleStatusUpdate(appt.id, appt.patientId, appt.patientName!, "Accepted")}>Approve</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleStatusUpdate(appt.id, appt.patientId, appt.patientName!, "Rejected")}>Decline</Button>
                          <RescheduleDialog 
                              appointment={appt} 
                              onReschedule={(id, notes) => handleStatusUpdate(id, appt.patientId, appt.patientName!, "Reschedule_Requested", notes)} 
                          />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                   <TableRow>
                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                      No pending requests.
                    </TableCell>
                  </TableRow>
                )}
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
                {recentPatients.length > 0 ? (
                    recentPatients.map((patient) => (
                    <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id.slice(0, 8)}...</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                            <Link href={`/doctor/patient-chart/${patient.id}`}>View Chart</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            No recent patients found.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}