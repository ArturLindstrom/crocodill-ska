"use client";

import { Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { area: "språk", visitors: 275, fill: "var(--color-språk)" },
  { area: "motorik", visitors: 200, fill: "var(--color-motorik)" },
  { area: "skapande", visitors: 187, fill: "var(--color-skapande)" },
  { area: "teknik", visitors: 173, fill: "var(--color-teknik)" },
  { area: "matematik", visitors: 90, fill: "var(--color-matematik)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  språk: {
    label: "Språk",
    color: "hsl(var(--chart-1))",
  },
  motorik: {
    label: "Motorik",
    color: "hsl(var(--chart-2))",
  },
  skapande: {
    label: "Skapande",
    color: "hsl(var(--chart-3))",
  },
  teknik: {
    label: "Teknik",
    color: "hsl(var(--chart-4))",
  },
  matematik: {
    label: "Matematik",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const PieChartCard = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Målområden</CardTitle>
        <CardDescription>HT-24</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          // className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="visitors" nameKey={"area"} />
            <ChartLegend
              content={<ChartLegendContent nameKey="area" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartCard;
