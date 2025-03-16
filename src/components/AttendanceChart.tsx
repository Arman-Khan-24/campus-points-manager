
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface AttendanceChartProps {
  presentDays: number;
  totalDays: number;
}

export const AttendanceChart = ({ presentDays, totalDays }: AttendanceChartProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const absentDays = totalDays - presentDays;
  const attendancePercentage = Math.round((presentDays / totalDays) * 100);
  
  const data = [
    { name: "Present", value: presentDays },
    { name: "Absent", value: absentDays },
  ];
  
  const COLORS = ["#6366f1", "#ef4444"];

  const getColorClass = (percentage: number) => {
    if (percentage >= 75) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string) => [
                `${value} days`, 
                name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col items-center mt-4">
        <h3 className={`text-4xl font-bold ${getColorClass(attendancePercentage)}`}>
          {attendancePercentage}%
        </h3>
        <p className="text-sm text-muted-foreground">
          ({presentDays}/{totalDays} days)
        </p>
      </div>
    </div>
  );
};

export default AttendanceChart;
