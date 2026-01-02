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
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import {
  LayoutDashboard,
  CalendarPlus,
  FlaskConical,
  LogOut,
  User,
  ClipboardPlus,
  Bell,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useUserStore } from "@/store/user";
import { useNotificationStore } from "@/store/notifications";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { href: "/patient/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/patient/appointments", icon: CalendarPlus, label: "Appointments" },
  { href: "/patient/test-results", icon: FlaskConical, label: "Test Results" },
  { href: "/patient/prescriptions", icon: ClipboardPlus, label: "Prescriptions" },
];

function NotificationsPopover() {
    const { notifications, markAsRead } = useNotificationStore();
    const { user } = useUserStore();
    
    // FIX 1: Safety check - if user isn't loaded, show empty bell
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
                        <p className="text-sm text-muted-foreground">
                        Recent updates and alerts.
                        </p>
                    </div>
                     <div className="grid gap-2">
                        {notifications.filter(n => n.userId === user.id).slice(0, 5).map(n => (
                            <div key={n.id} className="grid grid-cols-[25px_1fr] items-start pb-4 last:pb-0 last:border-b-0 border-b">
                                <span className={`flex h-2 w-2 translate-y-1 rounded-full ${!n.is_read ? 'bg-primary' : 'bg-transparent'}`} />
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium">{n.message}</p>
                                    <p className="text-sm text-muted-foreground">{new Date(n.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {unreadCount > 0 && (
                        <Button variant="link" onClick={() => markAsRead(user.id)}>Mark all as read</Button>
                    )}
                 </div>
            </PopoverContent>
        </Popover>
    )
}

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  // FIX 2: Get fetchUser and logout from store
  const { user, avatar, fetchUser, logout } = useUserStore();

  // FIX 3: Fetch user on mount
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  }

  const getIsActive = (href: string) => {
    if (href === "/patient/dashboard") {
      return pathname === href;
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
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={getIsActive(item.href)}
                  tooltip={item.label}
                >
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
                {/* FIX 4: Use handleLogout */}
                <SidebarMenuButton asChild tooltip="Log Out" onClick={handleLogout} className="cursor-pointer">
                  <span>
                    <LogOut />
                    <span>Log Out</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6 sticky top-0 z-30">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold font-headline">Patient Dashboard</h1>
          </div>
          <NotificationsPopover />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={avatar || "https://picsum.photos/seed/patient/100/100"} data-ai-hint="person photo" alt="Patient" />
                  <AvatarFallback>
                    {/* FIX 5: Check if user exists before accessing name */}
                    {user?.name ? user.name[0] : <User />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  {/* FIX 6: The Critical Fix - Check if user is null */}
                  <p className="text-sm font-medium leading-none">{user?.name || "Loading..."}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || ""}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
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