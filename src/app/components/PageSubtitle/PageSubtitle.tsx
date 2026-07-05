export function PageSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
      {children}
    </h2>
  );
}
