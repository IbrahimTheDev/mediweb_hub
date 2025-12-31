
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
import { Download, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Logo } from "@/components/logo";

const resultDetails = {
    id: "res-001",
    testName: "Lipid Panel",
    date: "July 20, 2024",
    doctor: "Dr. Emily Carter",
    comments: "Patient's cholesterol levels are slightly elevated. Recommend dietary changes and a follow-up in 3 months.",
    values: [
        { component: "Total Cholesterol", value: "210", unit: "mg/dL", range: "<200" },
        { component: "Triglycerides", value: "160", unit: "mg/dL", range: "<150" },
        { component: "HDL Cholesterol", value: "45", unit: "mg/dL", range: ">40" },
        { component: "LDL Cholesterol", value: "135", unit: "mg/dL", range: "<100" },
    ],
    patient: {
      name: "Jane Doe",
      dob: "1985-05-22",
      id: "P00123"
    }
};

const chartData = [
  { month: "Jan 23", total: 186 },
  { month: "Jul 23", total: 205 },
  { month: "Jan 24", total: 195 },
  { month: "Jul 24", total: 210 },
]

const chartConfig = {
  total: {
    label: "Total Cholesterol",
    color: "hsl(var(--chart-1))",
  },
}

export default function TestResultDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch result details using params.id
  const { testName, date, doctor, comments, values, patient } = resultDetails;
  const { toast } = useToast();
  const reportRef = React.useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const input = reportRef.current;
    if (!input) return;

    toast({
        title: "Generating PDF...",
        description: "Your test results PDF is being created.",
    });

    html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        
        const width = pdfWidth;
        const height = width / ratio;

        let finalHeight = height;
        if (height > pdfHeight) {
            finalHeight = pdfHeight;
        }

        pdf.addImage(imgData, 'PNG', 0, 0, width, finalHeight);
        pdf.save(`test-result-${resultDetails.id}.pdf`);
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
        <div ref={reportRef} className="bg-card p-8 text-black">
            <header className="flex justify-between items-start pb-4 border-b-2 border-black">
                <div className="flex items-center gap-4">
                    <Logo/>
                    <div>
                        <h1 className="text-2xl font-bold font-headline">MediWeb Hub</h1>
                        <div className="text-xs text-gray-600">
                            <p>123 Health St, Wellness City, 45678</p>
                            <p>contact@mediwebhub.com | (123) 456-7890</p>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold font-headline text-primary">Lab Report</h2>
                    <p className="text-sm">Report ID: {resultDetails.id}</p>
                </div>
            </header>
            <section className="grid grid-cols-2 gap-4 my-6 text-sm">
                <div>
                    <h3 className="font-bold mb-2">Patient Details</h3>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Date of Birth:</strong> {patient.dob}</p>
                    <p><strong>Patient ID:</strong> {patient.id}</p>
                </div>
                 <div className="text-right">
                    <h3 className="font-bold mb-2">Report Details</h3>
                    <p><strong>Report Date:</strong> {date}</p>
                    <p><strong>Ordering Physician:</strong> {doctor}</p>
                </div>
            </section>
            <Card className="shadow-none border-gray-300">
                <CardHeader className="bg-gray-50 rounded-t-lg">
                    <CardTitle className="font-headline text-xl">{testName}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="text-black font-semibold">Component</TableHead>
                                <TableHead className="text-black font-semibold">Value</TableHead>
                                <TableHead className="text-black font-semibold">Standard Range</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {values.map((v) => (
                                <TableRow key={v.component}>
                                    <TableCell className="font-medium">{v.component}</TableCell>
                                    <TableCell>{v.value} {v.unit}</TableCell>
                                    <TableCell>{v.range} {v.unit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <section className="my-6">
                <h3 className="font-bold text-sm mb-2">Doctor's Comments</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">{comments}</p>
            </section>
            <footer className="pt-8 mt-8 border-t-2 border-black text-sm">
                <div className="flex justify-between items-end">
                     <div>
                        <p>Electronically signed by:</p>
                        <p className="mt-8 border-t border-gray-400 pt-1 font-semibold">{doctor}</p>
                        <p className="text-xs text-gray-600">MediWeb Hub Laboratories</p>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                        <p>*** End of Report ***</p>
                        <p>This report is confidential and intended for the recipient only.</p>
                    </div>
                </div>
            </footer>
        </div>
        
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline text-3xl">Actions</CardTitle>
                    <CardDescription>
                        Download your results.
                    </CardDescription>
                </div>
                 <div className="flex justify-end gap-2">
                    <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4"/>
                        Download PDF
                    </Button>
                </div>
            </CardHeader>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <TrendingUp/> Trend Analysis
                </CardTitle>
                <CardDescription>Total Cholesterol over the last 2 years.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>


        <div className="mt-4 text-center">
            <Button variant="link" asChild>
            <Link href="/patient/test-results">← Back to all test results</Link>
            </Button>
        </div>
    </div>
  );
}
