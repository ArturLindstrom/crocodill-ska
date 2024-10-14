"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the expected props for BarChartCard
interface BarChartCardProps {
  countByMonth: { [key: string]: number };
  term: string; // HT-24 or VT-24
}

// Example month mapping for each term
const autumnMonths = [
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];
const springMonths = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
];

// Chart configuration
const chartConfig = {
  numberOfDocumentations: {
    label: "Antal",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const TermChart = ({ countByMonth, term }: BarChartCardProps) => {
  // Determine the month order based on the term (HT or VT)
  const monthOrder = term.startsWith("HT")
    ? autumnMonths
    : term.startsWith("VT")
    ? springMonths
    : [];

  // Transform countByMonth into chartData format
  const chartData = monthOrder.map((month) => ({
    month,
    numberOfDocumentations: countByMonth[month] || 0, // Use 0 if no data for the month
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Antal dokumentationer</CardTitle>
        <CardDescription>{term}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Show abbreviated month name
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="numberOfDocumentations"
              fill="var(--color-numberOfDocumentations)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TermChart;
