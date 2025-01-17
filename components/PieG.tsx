"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const desktopData = [
  { area: "Piso 1", desktop: 186, fill: "var(--color-january)" },
  { area: "Piso 2", desktop: 305, fill: "var(--color-february)" },
  { area: "Piso 3", desktop: 237, fill: "var(--color-march)" },
  { area: "Piso 4", desktop: 173, fill: "var(--color-april)" },
  { area: "Planta Baja", desktop: 209, fill: "var(--color-may)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

import "./PieG.css";

export function PieG() {
  const id = "pie-interactive";
  const [activeArea, setActiveArea] = React.useState(desktopData[0].area);

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.area === activeArea),
    [activeArea]
  );

  const areas = React.useMemo(() => desktopData.map((item) => item.area), []);

  return (
    <Card data-chart={id} className="flex flex-col" id="pie_card">
      <ChartStyle id={id} config={chartConfig} />

      <CardContent
        className="flex flex-1 justify-center pb-0"
        style={{ height: 220, width: 280 }}
      >
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="area"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <Select value={activeArea} onValueChange={setActiveArea}>
        <SelectTrigger
          className="h-7 w-[130px] rounded-lg pl-2.5 select-trigger"
          aria-label="Select an area"
        >
          <SelectValue placeholder="Select area" />
        </SelectTrigger>
        <SelectContent align="end" className="rounded-xl">
          {areas.map((key) => {
            const config = desktopData.find((item) => item.area === key);

            if (!config) {
              return null;
            }

            return (
              <SelectItem
                key={key}
                value={key}
                className="rounded-lg [&_span]:flex"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: config.fill,
                    }}
                  />
                  {config.area}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </Card>
  );
}
