'use client';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TChartConfig } from '@/types';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

interface IChart {
  chartConfig: TChartConfig;
  chartData: { data: string; before: number; after: number | bigint }[];
}
const Chart: React.FC<IChart> = ({ chartConfig, chartData }) => {
  return (
    <>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="data"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="before" fill="var(--color-before)" radius={4} />
          <Bar dataKey="after" fill="var(--color-after)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
};
export default Chart;
