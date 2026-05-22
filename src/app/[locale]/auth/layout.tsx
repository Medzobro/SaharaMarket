export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative">
      {/* Auth-specific decorative bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-purple/20 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-cyan/15 blur-[100px] animate-float [animation-delay:3s]" />
      </div>
      {children}
    </div>
  );
}
