
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubjectAttendanceProps {
  subject: string;
  percentage: number;
  present: number;
  total: number;
}

export const SubjectAttendance = ({
  subject,
  percentage,
  present,
  total,
}: SubjectAttendanceProps) => {
  const getStatusColor = (percentage: number) => {
    if (percentage >= 75) return "attendance-good";
    if (percentage >= 60) return "attendance-warning";
    return "attendance-danger";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{subject}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{percentage}%</span>
            <span className="text-sm text-muted-foreground">
              {present}/{total}
            </span>
          </div>
          <div className="attendance-bar bg-secondary">
            <div
              className={`attendance-value ${getStatusColor(percentage)}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectAttendance;
