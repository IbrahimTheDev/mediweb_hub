
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Upload, User } from "lucide-react";

export default function ProfilePage() {
    const { toast } = useToast();

    const handleInfoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Profile Updated",
            description: "Your personal information has been successfully updated.",
        });
    }

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Password Changed",
            description: "Your password has been successfully updated.",
        });
    }


  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Personal Information</CardTitle>
          <CardDescription>
            Update your personal details.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleInfoSubmit}>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                            <Upload className="h-4 w-4"/>
                            <span className="sr-only">Upload picture</span>
                        </Button>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" defaultValue="Jane Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                        </div>
                    </div>
                </div>

            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end">
                <Button type="submit">Save Changes</Button>
            </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Change Password</CardTitle>
          <CardDescription>
            Update your password. It's recommended to use a strong password.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordSubmit}>
            <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                </div>
            </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end">
                <Button type="submit">Update Password</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}

