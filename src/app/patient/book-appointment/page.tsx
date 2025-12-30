
"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { parseISO, isValid } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 'service', name: 'Service' },
  { id: 'doctor', name: 'Doctor' },
  { id: 'datetime', name: 'Date & Time' },
  { id: 'details', name: 'Details' },
];

function Stepper({ currentStep, steps }: { currentStep: number; steps: {id: string; name: string}[] }) {
    return (
        <div className="flex items-center justify-between w-full">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center text-center">
                        <div
                            className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-300",
                                currentStep > index ? "bg-primary border-primary text-primary-foreground" :
                                currentStep === index ? "border-primary" : "border-muted",
                            )}
                        >
                            {currentStep > index ? <Check className="w-5 h-5" /> : index + 1}
                        </div>
                        <p className={cn(
                            "text-xs mt-2",
                            currentStep >= index ? "font-medium text-foreground" : "text-muted-foreground"
                        )}>
                            {step.name}
                        </p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={cn(
                            "flex-1 h-0.5 mx-4 transition-colors duration-300",
                             currentStep > index ? "bg-primary" : "bg-muted"
                        )} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}


export default function BookAppointmentPage() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const { toast } = useToast();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (dateParam) {
      const parsedDate = parseISO(dateParam);
      if (isValid(parsedDate)) {
        setDate(parsedDate);
      }
    }
  }, [dateParam]);


  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
        title: "Appointment Requested!",
        description: `Your request has been submitted.`,
    });
    router.push('/patient/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-center">Request an Appointment</CardTitle>
          <CardDescription className="text-center">
            Follow the steps to book your appointment.
          </CardDescription>
           <div className="pt-4 pb-2">
                <Stepper currentStep={currentStep} steps={steps} />
           </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8 min-h-[350px] flex flex-col justify-center">
                {currentStep === 0 && (
                    <div className="space-y-4 animate-in fade-in-50 duration-500">
                        <Label className="text-lg font-medium text-center block">Which service do you need?</Label>
                         <Select required>
                            <SelectTrigger className="h-12 text-base max-w-sm mx-auto">
                                <SelectValue placeholder="Select a department or specialty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cardiology">Cardiology</SelectItem>
                                <SelectItem value="neurology">Neurology</SelectItem>
                                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                                <SelectItem value="primary-care">Primary Care</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
                {currentStep === 1 && (
                     <div className="space-y-4 animate-in fade-in-50 duration-500">
                        <Label className="text-lg font-medium text-center block">Choose your preferred doctor</Label>
                        <Select required>
                            <SelectTrigger className="h-12 text-base max-w-sm mx-auto">
                                <SelectValue placeholder="Select a doctor (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Any Available Doctor</SelectItem>
                                <SelectItem value="carter">Dr. Emily Carter</SelectItem>
                                <SelectItem value="adams">Dr. Ben Adams</SelectItem>
                                <SelectItem value="chen">Dr. Olivia Chen</SelectItem>
                                <SelectItem value="wilson">Dr. James Wilson</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
                {currentStep === 2 && (
                    <div className="space-y-4 animate-in fade-in-50 duration-500">
                        <Label className="text-lg font-medium text-center block">Select a date and time</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                           <div className="flex justify-center">
                            {isClient && (
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                                    className="rounded-md border"
                                />
                            )}
                           </div>
                            <div className="space-y-4">
                                <Label className="font-medium">Available Slots</Label>
                                <Select required>
                                    <SelectTrigger className="h-12 text-base">
                                    <SelectValue placeholder="Select a time slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="1000">10:00 AM</SelectItem>
                                    <SelectItem value="1100">11:00 AM</SelectItem>
                                    <SelectItem value="1400">02:00 PM</SelectItem>
                                    <SelectItem value="1500">03:00 PM</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                )}
                 {currentStep === 3 && (
                    <div className="space-y-4 animate-in fade-in-50 duration-500">
                        <Label className="text-lg font-medium text-center block">Additional Details</Label>
                        <Textarea id="notes" placeholder="Briefly describe your symptoms or reason for the visit... (optional)" className="min-h-[120px] text-base max-w-lg mx-auto" />
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
            {currentStep > 0 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4"/> Previous
                </Button>
            ) : (
                <div></div>
            )}
            
            {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4"/>
                </Button>
            ) : (
                <Button type="submit">
                    <Check className="mr-2 h-4 w-4"/> Submit Request
                </Button>
            )}
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}

    