
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
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const prescriptions = [
    { id: "PRES-001", patient: "John Smith", medication: "Lisinopril", date: "2024-08-01" },
    { id: "PRES-002", patient: "Sarah Lee", medication: "Sumatriptan", date: "2024-07-22" },
    { id: "PRES-003", patient: "Michael Johnson", medication: "Metformin", date: "2024-06-15" },
    { id: "PRES-004", patient: "Jessica Brown", medication: "Albuterol", date: "2024-08-10" },
];

export default function DoctorPrescriptionsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="font-headline">Prescription History</CardTitle>
            <CardDescription>
                View and manage past prescriptions.
            </CardDescription>
        </div>
        <Button asChild>
            <Link href="/doctor/prescriptions/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Prescription
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prescription ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Date Issued</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((presc) => (
              <TableRow key={presc.id}>
                <TableCell className="font-medium">{presc.id}</TableCell>
                <TableCell>{presc.patient}</TableCell>
                <TableCell>{presc.medication}</TableCell>
                <TableCell>{presc.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    View Details
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
