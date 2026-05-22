export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative">
      {/* Subtle warm bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-brand-yellow/10 to-transparent" />
        <div className="absolute inset-0 pattern-dots opacity-50" />
      </div>
      {children}
    </div>
  );
}
