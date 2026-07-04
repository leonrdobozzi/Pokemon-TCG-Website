export function tierColor(tier: string) {
  const map: Record<string, string> = {
    World: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
    International: "bg-purple-500/20 text-purple-300 border-purple-400/30",
    Regional: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    Online: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
    Cup: "bg-green-500/20 text-green-300 border-green-400/30",
  };
  return map[tier] ?? "bg-slate-500/20 text-slate-300 border-slate-400/30";
}
