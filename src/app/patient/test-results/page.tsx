
"use client";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FlaskConical, Search } from "lucide-react";
import Link from "next/link";


const results = [
    { id: "res-001", date: "2024-07-20", test: "Lipid Panel", status: "Results Available" },
    { id: "res-002", date: "2024-07-11", test: "Complete Blood Count", status: "Results Available" },
    { id: "res-003", date: "2024-06-15", test: "A1C Test", status: "Results Available" },
    { id: "res-004", date: "2024-05-01", test: "Thyroid Panel", status: "Results Available" },
];


export default function TestResultsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                 <CardTitle className="font-headline flex items-center gap-2">
                    <FlaskConical/> Test Results
                </CardTitle>
                <CardDescription>
                    A historical view of your lab and test results.
                </CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search results..." className="pl-8" />
                </div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Results</SelectItem>
                        <SelectItem value="bloodwork">Blood Work</SelectItem>
                        <SelectItem value="imaging">Imaging</SelectItem>
                        <SelectItem value="pathology">Pathology</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.date}</TableCell>
                <TableCell className="font-medium">{result.test}</TableCell>
                <TableCell>{result.status}</TableCell>
                <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/patient/test-results/${result.id}`}>
                            <Download className="mr-2 h-4 w-4" />
                            View
                        </Link>
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
