"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  SidebarFooter
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardPlus,
  LogOut,
  User,
  Bell,
  Loader2
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
import { useUserStore } from "@/store/user";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNotificationStore } from "@/store/notifications";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/doctor/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/doctor/appointments", icon: CalendarDays, label: "Appointments" },
  { href: "/doctor/patients", icon: Users, label: "Patients" },
  { href: "/doctor/prescriptions", icon: ClipboardPlus, label: "Prescriptions" },
];

function NotificationsPopover() {
    const { notifications, markAsRead } = useNotificationStore();
    const { user } = useUserStore();
    if (!user) return <Button variant="ghost" size="icon"><Bell /></Button>;
    const unreadCount = notifications.filter(n => n.userId === user.id && !n.is_read).length;

    return (
         <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell />
                    {unreadCount > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{unreadCount}</Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                 <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        <p className="text-sm text-muted-foreground">Recent updates.</p>
                    </div>
                     <div className="grid gap-2">
                        {notifications.filter(n => n.userId === user.id).slice(0, 5).map(n => (
                            <div key={n.id} className="grid grid-cols-[25px_1fr] items-start pb-4 border-b">
                                <span className={`flex h-2 w-2 translate-y-1 rounded-full ${!n.is_read ? 'bg-primary' : 'bg-transparent'}`} />
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium">{n.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </PopoverContent>
        </Popover>
    )
}

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, avatar, fetchUser, isLoading } = useUserStore();

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // PROTECTION LOGIC
  React.useEffect(() => {
    if (!isLoading && user) {
        // If user is on registration page but is already registered, go to dashboard
        if (pathname === '/doctor/registration' && user.registration_completed) {
            router.replace('/doctor/dashboard');
        }
        // If user is NOT on registration page but is NOT registered, go to registration
        else if (pathname !== '/doctor/registration' && !user.registration_completed) {
            router.replace('/doctor/registration');
        }
    }
  }, [isLoading, user, pathname, router]);

  const handleLogout = async () => {
    await useUserStore.getState().logout();
    router.push('/login');
  }

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary"/></div>
  }

  // If we are on the registration page, render only the children (the form)
  // This prevents the sidebar/header from showing up on the "Setup" page
  if (pathname === '/doctor/registration') {
      return <>{children}</>;
  }

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
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Log Out" onClick={handleLogout} className="cursor-pointer">
                  <span><LogOut /><span>Log Out</span></span>
                </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold font-headline">Doctor Dashboard</h1>
          </div>
          <NotificationsPopover />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={avatar || ""} alt="Doctor" />
                  <AvatarFallback>{user?.name?.[0] || "Dr"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
               <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}