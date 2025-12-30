import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  FileText,
  CalendarPlus,
  FlaskConical,
  Download,
  CalendarDays,
} from "lucide-react";

const appointments = [
  { date: "2024-08-15", time: "10:00 AM", doctor: "Dr. Emily Carter", type: "Cardiology Check-up" },
  { date: "2024-09-02", time: "02:30 PM", doctor: "Dr. Ben Adams", type: "Neurology Consultation" },
];

const testResults = [
  { date: "2024-07-20", test: "Lipid Panel", status: "Results Available" },
  { date: "2024-07-11", test: "Complete Blood Count", status: "Results Available" },
];

const medicalRecords = [
    { date: "2024-08-15", record: "Consultation Note - Dr. Carter" },
    { date: "2024-07-20", record: "Lab Results - Lipid Panel" },
    { date: "2024-07-11", record: "Lab Results - CBC" },
];

export default function PatientDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Appointments
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
            <p className="text-xs text-muted-foreground">
              You have {appointments.length} appointments scheduled.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-8">
            <Card id="appointments" className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><CalendarPlus/>Upcoming Appointments</CardTitle>
                <CardDescription>Review your upcoming visits.</CardDescription>
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
                    {appointments.map((appt, i) => (
                      <TableRow key={i}>
                        <TableCell>{appt.date} at {appt.time}</TableCell>
                        <TableCell>{appt.doctor}</TableCell>
                        <TableCell>{appt.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
                <Card id="results" className="scroll-mt-20">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><FlaskConical/>Test Results</CardTitle>
                    <CardDescription>View your latest lab results.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        {testResults.map((result, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <div className="font-medium">{result.test}</div>
                              <div className="text-sm text-muted-foreground">{result.date}</div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-2"/>View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card id="records" className="scroll-mt-20">
                  <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><FileText/>Medical Records</CardTitle>
                    <CardDescription>Access your health history.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        {medicalRecords.map((record, i) => (
                          <TableRow key={i}>
                             <TableCell>
                              <div className="font-medium">{record.record}</div>
                              <div className="text-sm text-muted-foreground">{record.date}</div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm"><Download className="h-3 w-3 mr-2"/>Download</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
            </div>
        </div>

        <div className="lg:col-span-2">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Book an Appointment</CardTitle>
              <CardDescription>Choose a date that works for you.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Request Appointment</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
