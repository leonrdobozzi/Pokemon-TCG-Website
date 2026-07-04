export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© 2025 TrainerHub · Not affiliated with The Pokémon Company</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
