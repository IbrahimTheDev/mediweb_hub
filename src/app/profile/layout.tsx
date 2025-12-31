
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  CalendarPlus,
  FlaskConical,
  LogOut,
  User,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const patientNavItems = [
  { href: "/patient/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/patient/appointments", icon: CalendarPlus, label: "Appointments" },
  { href: "/patient/test-results", icon: FlaskConical, label: "Test Results" },
];

const doctorNavItems = [
  { href: "/doctor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/doctor/dashboard#appointments", icon: CalendarPlus, label: "Appointments" },
  { href: "/doctor/dashboard#patients", icon: User, label: "Patients" },
  { href: "/doctor/dashboard#prescriptions", icon: FlaskConical, label: "Prescriptions" },
];


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [userType, setUserType] = React.useState<'patient' | 'doctor'>('patient');

  React.useEffect(() => {
    if (document.referrer.includes('/doctor')) {
      setUserType('doctor');
    }
  }, []);

  
  const navItems = userType === 'patient' ? patientNavItems : doctorNavItems;
  const dashboardUrl = userType === 'patient' ? '/patient/dashboard' : '/doctor/dashboard';
  const avatarUrl = userType === 'patient' ? 'https://picsum.photos/seed/patient/100/100' : 'https://picsum.photos/seed/doctor-profile/100/100';
  const userName = userType === 'patient' ? 'Jane Doe' : 'Dr. Ben Adams';
  const userEmail = userType === 'patient' ? 'jane.doe@example.com' : 'b.adams@mediweb.com';
  const dashboardName = userType === 'patient' ? 'Patient' : 'Doctor';


  const getIsActive = (href: string) => {
    if (href.includes("dashboard")) {
      return pathname.startsWith('/patient/dashboard') || pathname.startsWith('/doctor/dashboard');
    }
    return pathname.startsWith(href);
  };


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold font-headline">MediWeb Hub</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
           <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild variant="ghost">
                 <Link href={dashboardUrl}>
                    <ArrowLeft />
                    <span>Back to Dashboard</span>
                  </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
        </SidebarContent>
         <SidebarFooter>
           <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Log Out">
                  <Link href="/">
                    <LogOut />
                    <span>Log Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold font-headline">{dashboardName} Profile</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={avatarUrl} alt="User" />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
