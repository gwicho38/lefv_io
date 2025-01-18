import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

type ChartDataPoint = {
  timestamp: number;
  temperature?: number;
  precipitation?: number;
};

type WeatherChartProps = {
  type?: "temperature" | "precipitation";
};

export function WeatherChart({ type = "temperature" }: WeatherChartProps) {
  const { data: chartData } = useQuery<ChartDataPoint[]>({
    queryKey: [`/api/weather/history/${type}`],
    refetchInterval: 300000,
  });

  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No historical data available
      </div>
    );
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => format(new Date(timestamp), "ha")}
          />
          <YAxis
            unit={type === "temperature" ? "°F" : "in"}
            width={45}
          />
          <Tooltip
            labelFormatter={(timestamp) =>
              format(new Date(timestamp), "MMM d, h:mm a")
            }
            formatter={(value: number) =>
              type === "temperature"
                ? `${value.toFixed(1)}°F`
                : `${value.toFixed(2)} in`
            }
          />
          <Line
            type="monotone"
            dataKey={type}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeatherChart;
