
"use client";

import * as React from "react";
import Image from "next/image";
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
import { useToast } from "@/hooks/use-toast";
import { Upload, User, Phone } from "lucide-react";
import { useUserStore } from "@/store/user";

export default function ProfilePage() {
    const { toast } = useToast();
    const { user, setUser, avatar, setAvatar } = useUserStore();
    
    const [mobile, setMobile] = React.useState(user.mobile);
    const [email, setEmail] = React.useState(user.email);
    
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = React.useState(false);


    const fileInputRef = React.useRef<HTMLInputElement>(null);
    

    const handleInfoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUser({ name: user.name, email, mobile });
        toast({
            title: "Profile Updated",
            description: "Your personal information has been successfully updated.",
        });
    }

    const handleVerifyPassword = () => {
        // In a real app, you'd verify this against a backend.
        if (currentPassword) {
             setIsCurrentPasswordVerified(true);
             toast({
                title: "Password Verified",
                description: "You can now set a new password.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Verification Failed",
                description: "Please enter your current password.",
            });
        }
    }


    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isCurrentPasswordVerified) {
             toast({
                variant: "destructive",
                title: "Verification Required",
                description: "Please verify your current password first.",
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            toast({
                variant: "destructive",
                title: "Passwords do not match",
                description: "Please ensure your new password and confirmation match.",
            });
            return;
        }
        if (!newPassword) {
            toast({
                variant: "destructive",
                title: "Password cannot be empty",
                description: "Please enter a new password.",
            });
            return;
        }
        toast({
            title: "Password Changed",
            description: "Your password has been successfully updated.",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsCurrentPasswordVerified(false);
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
                toast({
                    title: "Picture Uploaded",
                    description: "Your new profile picture is now set.",
                });
            };
            reader.readAsDataURL(file);
        }
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
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                            {avatar ? (
                                <Image src={avatar} alt="Profile picture" width={96} height={96} className="object-cover w-full h-full" />
                            ) : (
                                <User className="w-12 h-12 text-muted-foreground" />
                            )}
                        </div>
                        <Input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            onChange={handleAvatarChange}
                            accept="image/*"
                        />
                        <Button 
                            size="icon" 
                            variant="outline" 
                            type="button"
                            className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="h-4 w-4"/>
                            <span className="sr-only">Upload picture</span>
                        </Button>
                    </div>
                     <div className="flex-1 grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="mobile-no">Mobile No.</Label>
                            <Input id="mobile-no" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                         <div className="space-y-2 col-span-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                <div className="flex items-center gap-2">
                    <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} disabled={isCurrentPasswordVerified}/>
                    <Button type="button" variant="outline" onClick={handleVerifyPassword} disabled={isCurrentPasswordVerified}>Verify</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={!isCurrentPasswordVerified}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={!isCurrentPasswordVerified}/>
                </div>
            </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end">
                <Button type="submit" disabled={!isCurrentPasswordVerified}>Update Password</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
