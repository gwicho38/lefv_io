import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Cloud, 
  Droplets, 
  Thermometer, 
  Wind,
  CloudRain
} from "lucide-react";

type WeatherMetric = {
  label: string;
  value: number | string;
  unit: string;
  icon: "temperature" | "humidity" | "wind" | "pressure" | "rain";
};

const icons = {
  temperature: Thermometer,
  humidity: Droplets,
  wind: Wind,
  pressure: Cloud,
  rain: CloudRain
};

type WeatherCardProps = {
  metric: WeatherMetric;
};

export function WeatherCard({ metric }: WeatherCardProps) {
  const Icon = icons[metric.icon];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {metric.label}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof metric.value === 'number' ? metric.value.toFixed(1) : metric.value}
          <span className="ml-1 text-lg font-normal text-muted-foreground">
            {metric.unit}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;