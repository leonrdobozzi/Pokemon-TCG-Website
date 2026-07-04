import { Layers, Zap, Flame, Star, Shield, Wind, Droplets } from "lucide-react";
import { ReactElement } from "react";

export default function TypeIcon({
  type,
  size = 14,
}: {
  type: string;
  size?: number;
}) {
  const icons: Record<string, ReactElement> = {
    Fire: <Flame size={size} />,
    Lightning: <Zap size={size} />,
    Psychic: <Wind size={size} />,
    Dragon: <Star size={size} />,
    Water: <Droplets size={size} />,
    Grass: <Layers size={size} />,
  };
  return icons[type] ?? <Shield size={size} />;
}
