
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { LogOut, Mail, Phone, MapPin, BookOpen, GraduationCap, Calendar } from "lucide-react";

const Profile = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    } else {
      setLoaded(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userErp");
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    
    navigate("/");
  };

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">View and manage your profile information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=S12345" />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">Student Name</h2>
                <p className="text-muted-foreground mb-4">Computer Science</p>
                
                <div className="w-full space-y-2 mt-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">student.name@university.edu</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">+91 9876543210</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Engineering Block, Room 302</span>
                  </div>
                </div>
                
                <Button 
                  variant="destructive" 
                  className="mt-6 w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Your academic and personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="academic">
                <TabsList className="mb-4">
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="academic">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold flex items-center mb-3">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Academic Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ERP ID</span>
                          <span className="font-medium">S12345</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Department</span>
                          <span className="font-medium">Computer Science & Engineering</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Program</span>
                          <span className="font-medium">Bachelor of Technology</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Batch</span>
                          <span className="font-medium">2021-2025</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Semester</span>
                          <span className="font-medium">5th Semester</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current CGPA</span>
                          <span className="font-medium">8.7/10</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold flex items-center mb-3">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Course Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Enrolled Courses</h4>
                            <ul className="space-y-1 text-sm">
                              <li>CS301 - Data Structures</li>
                              <li>CS302 - Computer Networks</li>
                              <li>CS303 - Database Management</li>
                              <li>CS304 - Software Engineering</li>
                              <li>MA301 - Mathematics</li>
                              <li>CS305 - Web Development</li>
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Faculty Advisors</h4>
                            <ul className="space-y-1 text-sm">
                              <li>Dr. Rajesh Kumar (Academic)</li>
                              <li>Dr. Priya Sharma (Technical)</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="personal">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold flex items-center mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        Personal Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Full Name</span>
                          <span className="font-medium">Student Name</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date of Birth</span>
                          <span className="font-medium">15 August 2001</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gender</span>
                          <span className="font-medium">Male</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Blood Group</span>
                          <span className="font-medium">O+</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nationality</span>
                          <span className="font-medium">Indian</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold flex items-center mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email</span>
                          <span className="font-medium">student.name@university.edu</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone</span>
                          <span className="font-medium">+91 9876543210</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Permanent Address</span>
                          <span className="font-medium">123 Main St, City, State, 400001</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hostel Address</span>
                          <span className="font-medium">Hostel Block C, Room 302</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">You can access your important academic documents here.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Academic Transcripts</h4>
                          <p className="text-sm text-muted-foreground mb-4">Last updated: 15 July 2023</p>
                          <Button variant="outline" size="sm" disabled>Download</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Enrollment Certificate</h4>
                          <p className="text-sm text-muted-foreground mb-4">Last updated: 20 Jun 2023</p>
                          <Button variant="outline" size="sm" disabled>Download</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Fee Receipts</h4>
                          <p className="text-sm text-muted-foreground mb-4">Last updated: 12 Aug 2023</p>
                          <Button variant="outline" size="sm" disabled>Download</Button>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Identity Card</h4>
                          <p className="text-sm text-muted-foreground mb-4">Last updated: 05 May 2023</p>
                          <Button variant="outline" size="sm" disabled>Download</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
