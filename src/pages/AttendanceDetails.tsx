
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { AttendanceChart } from "@/components/AttendanceChart";
import { SubjectAttendance } from "@/components/SubjectAttendance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Subject {
  name: string;
  percentage: number;
  present: number;
  total: number;
}

const subjectsData: Subject[] = [
  { name: "Mathematics", percentage: 78, present: 39, total: 50 },
  { name: "Computer Networks", percentage: 92, present: 46, total: 50 },
  { name: "Data Structures", percentage: 84, present: 42, total: 50 },
  { name: "Database Management", percentage: 70, present: 35, total: 50 },
  { name: "Software Engineering", percentage: 88, present: 44, total: 50 },
  { name: "Web Development", percentage: 64, present: 32, total: 50 },
];

const monthsData = {
  "Jan 2023": 85,
  "Feb 2023": 90,
  "Mar 2023": 95,
  "Apr 2023": 88,
  "May 2023": 92,
  "Jun 2023": 78,
  "Jul 2023": 82,
  "Aug 2023": 87,
};

const AttendanceDetails = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  // Calculate overall attendance
  const totalClasses = subjectsData.reduce((acc, subject) => acc + subject.total, 0);
  const totalPresent = subjectsData.reduce((acc, subject) => acc + subject.present, 0);
  const overallPercentage = Math.round((totalPresent / totalClasses) * 100);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    } else {
      setLoaded(true);
    }
  }, [navigate]);

  const subjectChartData = subjectsData.map(subject => ({
    name: subject.name,
    value: subject.percentage
  }));

  const COLORS = ["#6366f1", "#3b82f6", "#ef4444", "#22c55e", "#eab308", "#a855f7"];

  if (!loaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Attendance Details</h1>
          <p className="text-muted-foreground">View and analyze your attendance records</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
              <CardDescription>Your overall attendance across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center">
                  <AttendanceChart presentDays={totalPresent} totalDays={totalClasses} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Statistics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Classes</span>
                        <span>{totalClasses}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Present</span>
                        <span>{totalPresent}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Absent</span>
                        <span>{totalClasses - totalPresent}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Overall Percentage</span>
                        <span className={`font-bold ${overallPercentage >= 75 ? "text-green-500" : overallPercentage >= 60 ? "text-yellow-500" : "text-red-500"}`}>
                          {overallPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subject Distribution</CardTitle>
              <CardDescription>Attendance percentage by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subjectChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subjectChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Attendance']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject Wise Attendance</CardTitle>
            <CardDescription>Detailed breakdown of your attendance by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current">
              <TabsList className="mb-4">
                <TabsTrigger value="current">Current Semester</TabsTrigger>
                <TabsTrigger value="history">Past Semesters</TabsTrigger>
              </TabsList>
              <TabsContent value="current">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjectsData.map((subject) => (
                    <SubjectAttendance
                      key={subject.name}
                      subject={subject.name}
                      percentage={subject.percentage}
                      present={subject.present}
                      total={subject.total}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="history">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Previous semester data is currently being processed.
                    <br />
                    Please check back later.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AttendanceDetails;
