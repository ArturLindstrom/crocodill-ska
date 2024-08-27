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
const chartData = [
  { month: "Augusti", numberOfDocumentations: 186 },
  { month: "September", numberOfDocumentations: 305 },
  { month: "Oktober", numberOfDocumentations: 237 },
  { month: "November", numberOfDocumentations: 73 },
  { month: "December", numberOfDocumentations: 209 },
];
const chartConfig = {
  numberOfDocumentations: {
    label: "Antal",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
const BarChartCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Antal dokumentationer</CardTitle>
        <CardDescription>HT-24</CardDescription>
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
              tickFormatter={(value) => value.slice(0, 3)}
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

export default BarChartCard;
