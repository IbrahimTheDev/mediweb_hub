import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const appointments = [
  { time: "09:00 AM", patient: "John Smith", reason: "Follow-up", status: "Confirmed" },
  { time: "10:00 AM", patient: "Sarah Lee", reason: "New Patient Consultation", status: "Confirmed" },
  { time: "11:30 AM", patient: "Michael Johnson", reason: "Annual Check-up", status: "Arrived" },
  { time: "01:00 PM", patient: "Jessica Brown", reason: "Follow-up", status: "Pending" },
  { time: "02:30 PM", patient: "David Wilson", reason: "Pre-op Assessment", status: "Confirmed" },
];

const patients = [
    { id: "P001", name: "John Smith", lastVisit: "2024-08-01", diagnosis: "Hypertension" },
    { id: "P002", name: "Sarah Lee", lastVisit: "2024-07-22", diagnosis: "Migraine" },
    { id: "P003", name: "Michael Johnson", lastVisit: "2024-06-15", diagnosis: "Type 2 Diabetes" },
    { id: "P004", name: "Jessica Brown", lastVisit: "2024-08-10", diagnosis: "Asthma" },
    { id: "P005", name: "David Wilson", lastVisit: "2024-05-28", diagnosis: "Scheduled for surgery" },
];


export default function DoctorDashboardPage() {
  return (
    <Tabs defaultValue="appointments" className="space-y-4">
      <TabsList>
        <TabsTrigger value="appointments" id="appointments" className="scroll-mt-20">Today's Appointments</TabsTrigger>
        <TabsTrigger value="patients" id="patients" className="scroll-mt-20">Patients</TabsTrigger>
        <TabsTrigger value="prescriptions" id="prescriptions" className="scroll-mt-20">Digital Prescription</TabsTrigger>
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
                      <Badge variant={appt.status === "Arrived" ? "default" : "secondary"}>
                        {appt.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Chart</Button>
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
            <CardTitle className="font-headline">Patient History</CardTitle>
            <CardDescription>
              Search and manage your patient records.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients by name or ID..." className="pl-8" />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Last Diagnosis</TableHead>
                   <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.diagnosis}</TableCell>
                     <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Full History</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="prescriptions">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">New Digital Prescription</CardTitle>
            <CardDescription>
              Create and send a new prescription to the pharmacy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="patient-search">Patient Name or ID</Label>
                    <Input id="patient-search" placeholder="Search for a patient..." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="medication">Medication</Label>
                    <Input id="medication" placeholder="e.g., Lisinopril" />
                </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input id="dosage" placeholder="e.g., 10mg" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input id="frequency" placeholder="e.g., Once daily" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="e.g., 30" />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="e.g., Take with food. No refills." />
            </div>
            <Button>Send Prescription</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
