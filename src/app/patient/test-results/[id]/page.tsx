
"use client"
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { Download, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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
    ]
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
  const { testName, date, doctor, comments, values } = resultDetails;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">{testName}</CardTitle>
                <CardDescription>
                    Result from {date} - Ordered by {doctor}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Component</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Standard Range</TableHead>
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
                 <Separator className="my-6" />
                 <div>
                    <h3 className="font-semibold mb-2">Doctor's Comments</h3>
                    <p className="text-sm text-muted-foreground">{comments}</p>
                 </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4"/>
                    Message Doctor
                </Button>
                <Button>
                    <Download className="mr-2 h-4 w-4"/>
                    Download PDF
                </Button>
            </CardFooter>
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
