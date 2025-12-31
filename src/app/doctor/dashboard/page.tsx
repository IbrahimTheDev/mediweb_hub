
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


const appointments = [
  { patientId: "P001", time: "09:00 AM", patient: "John Smith", reason: "Follow-up", status: "Confirmed" },
  { patientId: "P002", time: "10:00 AM", patient: "Sarah Lee", reason: "New Patient Consultation", status: "Confirmed" },
  { patientId: "P003", time: "11:30 AM", patient: "Michael Johnson", reason: "Annual Check-up", status: "Arrived" },
  { patientId: "P004", time: "01:00 PM", patient: "Jessica Brown", reason: "Follow-up", status: "Pending" },
  { patientId: "P005", time: "02:30 PM", patient: "David William", reason: "Pre-op Assessment", status: "Confirmed" },
];

const recentPatients = [
    { id: "P001", name: "John Smith", lastVisit: "2024-08-01", diagnosis: "Hypertension" },
    { id: "P004", name: "Jessica Brown", lastVisit: "2024-08-10", diagnosis: "Asthma" },
    { id: "P002", name: "Sarah Lee", lastVisit: "2024-07-22", diagnosis: "Migraine" },
];


export default function DoctorDashboardPage() {
  const router = useRouter();

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "Arrived":
        return "default"; // blue
      case "Confirmed":
        return "secondary"; // green/gray
      case "Pending":
        return "destructive"; // orange/red
      default:
        return "outline";
    }
  };


  return (
    <Tabs defaultValue="appointments" className="space-y-4">
      <TabsList>
        <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
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
                {appointments.map((appt) => (
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
