
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BookOpenCheck, CreditCard, Clock } from "lucide-react";
import { AttendanceChart } from "@/components/AttendanceChart";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [userName, setUserName] = useState("Student");
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    } else {
      setLoaded(true);
      // For a real app, you would fetch user data here
      const userErp = localStorage.getItem("userErp");
      if (userErp) {
        setUserName(userErp);
      }
    }
  }, [navigate]);

  // Mock attendance data for the chart
  const attendanceData = [
    {
      name: "Jan",
      attendance: 85,
    },
    {
      name: "Feb",
      attendance: 90,
    },
    {
      name: "Mar",
      attendance: 95,
    },
    {
      name: "Apr",
      attendance: 88,
    },
    {
      name: "May",
      attendance: 92,
    },
    {
      name: "Jun",
      attendance: 78,
    },
    {
      name: "Jul",
      attendance: 82,
    },
    {
      name: "Aug",
      attendance: 87,
    },
  ];

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Hello, {userName}</h1>
          <p className="text-muted-foreground">Here is your current status for today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                Last updated: Today
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Subjects</CardTitle>
              <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                Enrolled this semester
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Campus Points</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">750</div>
              <p className="text-xs text-muted-foreground">
                Available balance
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Next Class</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11:30 AM</div>
              <p className="text-xs text-muted-foreground">
                Computer Networks (Room 302)
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
              <CardDescription>Your monthly attendance percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceData}>
                    <defs>
                      <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="attendance"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorAttendance)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Semester</CardTitle>
              <CardDescription>Overall attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceChart presentDays={85} totalDays={100} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => navigate("/attendance")} className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Attendance Details
                </Button>
                <Button onClick={() => navigate("/campus-points")} className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Campus Points
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
