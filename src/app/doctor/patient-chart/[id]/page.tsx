
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileText, Heart, Thermometer, Weight, PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";


const patientData = {
    P001: { name: "John Smith", dob: "1975-05-20", gender: "Male" },
    P002: { name: "Sarah Lee", dob: "1982-11-30", gender: "Female" },
    P003: { name: "Michael Johnson", dob: "1990-01-15", gender: "Male" },
    P004: { name: "Jessica Brown", dob: "1988-08-25", gender: "Female" },
    P005: { name: "David William", dob: "1965-03-10", gender: "Male" },
};

const vitals = [
    { date: "2024-08-01", bp: "140/90 mmHg", temp: "98.6°F", weight: "180 lbs" },
    { date: "2024-02-05", bp: "135/88 mmHg", temp: "98.7°F", weight: "178 lbs" },
];

const labResults = [
    { id: "res-001", date: "2024-08-01", test: "Lipid Panel", result: "View Report" },
    { id: "res-002", date: "2024-02-05", test: "CBC", result: "View Report" },
];

const pastConsultations = [
    { date: "2024-08-01", reason: "Initial Consultation", notes: "Patient presents with high blood pressure..." },
    { date: "2024-02-05", reason: "Follow-up", notes: "Discussed medication adherence..." },
];

export default function PatientChartPage({ params }: { params: { id: string } }) {
    const patient = patientData[params.id as keyof typeof patientData] || { name: "Unknown Patient", dob: "N/A", gender: "N/A" };
    const { toast } = useToast();

    const handleSaveNote = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Note Saved",
            description: "The progress note has been successfully added to the patient's chart.",
        });
        // In a real app, you would clear the textarea or update the consultations list.
    };
  
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-headline">{patient.name}'s Chart</h1>
                <p className="text-muted-foreground">
                    DOB: {patient.dob} | Gender: {patient.gender} | Patient ID: {params.id}
                </p>
            </div>
            <Button variant="outline" asChild>
                <Link href="/doctor/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Link>
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">Vitals History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead><Heart className="inline-block mr-2 h-4 w-4"/>Blood Pressure</TableHead>
                            <TableHead><Thermometer className="inline-block mr-2 h-4 w-4"/>Temperature</TableHead>
                            <TableHead><Weight className="inline-block mr-2 h-4 w-4"/>Weight</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vitals.map(v => (
                            <TableRow key={v.date}>
                                <TableCell>{v.date}</TableCell>
                                <TableCell>{v.bp}</TableCell>
                                <TableCell>{v.temp}</TableCell>
                                <TableCell>{v.weight}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><FileText />Lab Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            {labResults.map(lab => (
                                <TableRow key={lab.test}>
                                    <TableCell>
                                        <p className="font-medium">{lab.test}</p>
                                        <p className="text-sm text-muted-foreground">{lab.date}</p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="link" size="sm" asChild>
                                            <Link href={`/doctor/test-result/${lab.id}`}>{lab.result}</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><FileText />Past Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                    {pastConsultations.map(c => (
                        <div key={c.date} className="mb-4">
                            <p className="font-semibold">{c.date} - {c.reason}</p>
                            <p className="text-sm text-muted-foreground">{c.notes}</p>
                            <Separator className="mt-2"/>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><PlusCircle />Add Progress Note</CardTitle>
                <CardDescription>Add a new note for today's visit.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveNote}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="progress-note">Consultation Notes</Label>
                        <Textarea id="progress-note" placeholder="Enter notes here..." className="min-h-[150px]"/>
                    </div>
                    <Button type="submit">Save Note</Button>
                </CardContent>
            </form>
        </Card>
    </div>
  );
}
