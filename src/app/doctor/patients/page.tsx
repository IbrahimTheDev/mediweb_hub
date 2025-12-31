
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import Link from "next/link";

const patients = [
    { id: "P001", name: "John Smith", lastVisit: "2024-08-01", diagnosis: "Hypertension" },
    { id: "P002", name: "Sarah Lee", lastVisit: "2024-07-22", diagnosis: "Migraine" },
    { id: "P003", name: "Michael Johnson", lastVisit: "2024-06-15", diagnosis: "Type 2 Diabetes" },
    { id: "P004", name: "Jessica Brown", lastVisit: "2024-08-10", diagnosis: "Asthma" },
    { id: "P005", name: "David William", lastVisit: "2024-05-28", diagnosis: "Scheduled for surgery" },
];

export default function DoctorPatientsPage() {
    const [searchTerm, setSearchTerm] = React.useState("");
    
    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Patient Database</CardTitle>
        <CardDescription>
          Search and manage your patient records.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search patients by name or ID..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>{patient.diagnosis}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/doctor/patient-chart/${patient.id}`}>View Full History</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
