
import * as React from "react";
import BookAppointmentForm from "./form";
import { Skeleton } from "@/components/ui/skeleton";

function StepperSkeleton() {
    return (
        <div className="flex items-center justify-between w-full">
            {Array.from({ length: 4 }).map((_, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center text-center">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="h-4 w-12 mt-2" />
                    </div>
                    {index < 3 && (
                        <Skeleton className="flex-1 h-0.5 mx-4" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}


export default function BookAppointmentPage() {
  return (
    <React.Suspense fallback={
        <div className="max-w-3xl mx-auto">
            <div className="p-6 text-center space-y-2">
                <Skeleton className="h-8 w-1/2 mx-auto" />
                <Skeleton className="h-5 w-3/4 mx-auto" />
                <div className="pt-4 pb-2">
                    <StepperSkeleton />
                </div>
            </div>
            <div className="p-6 pt-0 space-y-8 min-h-[350px] flex flex-col justify-center items-center">
                <Skeleton className="h-12 w-full max-w-sm" />
            </div>
            <div className="flex justify-between p-6 pt-0">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-24" />
            </div>
        </div>
    }>
      <BookAppointmentForm />
    </React.Suspense>
  );
}

