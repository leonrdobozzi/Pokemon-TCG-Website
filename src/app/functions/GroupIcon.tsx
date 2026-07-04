import { ReactElement } from "react";
import {
  Layers,
  Trophy,
  Users,
  Star,
  Package,
  Sparkles,
  Hash,
} from "lucide-react";

export function GroupIcon({ icon }: { icon: string }) {
  const map: Record<string, ReactElement> = {
    trophy: <Trophy size={18} />,
    sparkles: <Sparkles size={18} />,
    layers: <Layers size={18} />,
    users: <Users size={18} />,
    star: <Star size={18} />,
    package: <Package size={18} />,
  };
  return map[icon] ?? <Hash size={18} />;
}
