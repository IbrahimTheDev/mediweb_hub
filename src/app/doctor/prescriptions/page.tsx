
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
import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subDays, isAfter } from 'date-fns';
import { usePrescriptionStore } from "@/store/prescriptions";


export default function DoctorPrescriptionsPage() {
    const { prescriptions } = usePrescriptionStore();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [dateFilter, setDateFilter] = React.useState("all");

    const filteredPrescriptions = prescriptions.filter(presc => {
        const matchesSearch = presc.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              presc.medications.some(m => m.medication.toLowerCase().includes(searchTerm.toLowerCase()));

        if (dateFilter === 'all') {
            return matchesSearch;
        }

        const today = new Date();
        const filterDate = subDays(today, parseInt(dateFilter, 10));
        const prescDate = new Date(presc.date);
        
        return matchesSearch && isAfter(prescDate, filterDate);
    });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <CardTitle className="font-headline">Prescription History</CardTitle>
                <CardDescription>
                    View and manage past prescriptions.
                </CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                 <div className="relative flex-1 md:flex-initial">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search prescriptions..." 
                        className="pl-8" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="365">Last Year</SelectItem>
                    </SelectContent>
                </Select>
                 <Button asChild className="hidden md:inline-flex">
                    <Link href="/doctor/prescriptions/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New
                    </Link>
                </Button>
            </div>
        </div>
         <div className="mt-4 md:hidden">
             <Button asChild className="w-full">
                <Link href="/doctor/prescriptions/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Prescription
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prescription ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date Issued</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrescriptions.length > 0 ? (
                filteredPrescriptions.map((presc) => (
                <TableRow key={presc.id}>
                    <TableCell className="font-medium">{presc.id}</TableCell>
                    <TableCell>{presc.patient}</TableCell>
                    <TableCell>{presc.date}</TableCell>
                    <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/doctor/prescriptions/${presc.id}`}>View Details</Link>
                    </Button>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        No prescriptions found for the selected criteria.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
