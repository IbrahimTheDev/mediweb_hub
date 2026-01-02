"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, User, X } from "lucide-react";
import { useUserStore } from "@/store/user";

export default function DoctorRegistration() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { fetchUser } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Comprehensive Form State
  const [formData, setFormData] = useState({
    specialty: "",
    experience: "",
    qualifications: "",
    hospital_name: "",
    address: "",
    bio: "",
    availability: "",
    consultation_fee: "",
    mobile: "",
    gender: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.replace("/login");
      setUser(user);
    };
    getUser();
  }, [router]);

  // Handle Image Selection & Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Upload to Supabase Storage ('avatars' bucket)
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      setPreviewUrl(publicUrl);
      toast({ title: "Image uploaded", description: "Profile picture set successfully." });

    } catch (error: any) {
      toast({ variant: "destructive", title: "Upload Failed", description: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      // Validation
      if (!previewUrl) throw new Error("Please upload a profile picture.");

      // Update Profile in DB
      const { error } = await supabase
        .from("profiles")
        .update({
            specialty: formData.specialty,
            experience: formData.experience,
            qualifications: formData.qualifications,
            hospital_name: formData.hospital_name,
            address: formData.address,
            bio: formData.bio,
            availability: formData.availability,
            consultation_fee: formData.consultation_fee,
            mobile: formData.mobile,
            gender: formData.gender,
            image_url: previewUrl, // Store the image URL
            registration_completed: true, // Mark as complete
        })
        .eq("id", user.id);

      if (error) throw error;

      // Refresh global store so dashboard sees new data
      await fetchUser();

      toast({ title: "Registration Complete", description: "Redirecting to dashboard..." });
      router.push("/doctor/dashboard");

    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen flex items-center justify-center bg-muted/20">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Doctor Registration</CardTitle>
          <CardDescription>
            Please complete your professional profile to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Profile Image Upload Section */}
            <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-muted/30">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-sm bg-muted flex items-center justify-center">
                    {previewUrl ? (
                        <Image src={previewUrl} alt="Profile" fill className="object-cover" />
                    ) : (
                        <User className="h-12 w-12 text-muted-foreground" />
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                    >
                        {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2"/> : <Upload className="h-4 w-4 mr-2"/>}
                        {previewUrl ? "Change Photo" : "Upload Photo"}
                    </Button>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                    />
                </div>
                <p className="text-xs text-muted-foreground">Recommended: Square JPG/PNG, max 2MB</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal & Contact Info */}
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Mobile Number</Label>
                        <Input required placeholder="+1 234 567 890" value={formData.mobile} onChange={e => handleChange('mobile', e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Gender</Label>
                        <Select onValueChange={val => handleChange('gender', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Hospital / Clinic Name</Label>
                        <Input required placeholder="City General Hospital" value={formData.hospital_name} onChange={e => handleChange('hospital_name', e.target.value)} />
                    </div>
                     <div className="grid gap-2">
                        <Label>Work Address</Label>
                        <Input required placeholder="123 Medical Drive, NY" value={formData.address} onChange={e => handleChange('address', e.target.value)} />
                    </div>
                </div>

                {/* Professional Info */}
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Specialty</Label>
                        <Select onValueChange={val => handleChange('specialty', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Specialty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                                <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                                <SelectItem value="Neurologist">Neurologist</SelectItem>
                                <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                                <SelectItem value="General Physician">General Physician</SelectItem>
                                <SelectItem value="Orthopedic">Orthopedic</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Experience (Years)</Label>
                        <Input required placeholder="e.g. 8" type="number" value={formData.experience} onChange={e => handleChange('experience', e.target.value)} />
                    </div>
                     <div className="grid gap-2">
                        <Label>Qualifications</Label>
                        <Input required placeholder="MBBS, MD" value={formData.qualifications} onChange={e => handleChange('qualifications', e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Consultation Fee ($)</Label>
                        <Input required placeholder="100" type="number" value={formData.consultation_fee} onChange={e => handleChange('consultation_fee', e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Full Width Fields */}
            <div className="grid gap-2">
                <Label>Availability / Schedule</Label>
                <Input required placeholder="e.g. Mon-Fri: 9AM - 5PM" value={formData.availability} onChange={e => handleChange('availability', e.target.value)} />
            </div>

            <div className="grid gap-2">
                <Label>Professional Bio</Label>
                <Textarea 
                    required 
                    placeholder="Briefly describe your expertise and background..." 
                    className="min-h-[100px]"
                    value={formData.bio} 
                    onChange={e => handleChange('bio', e.target.value)} 
                />
            </div>

            <Button type="submit" className="w-full size-lg text-lg" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2"/> : "Complete Registration"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}