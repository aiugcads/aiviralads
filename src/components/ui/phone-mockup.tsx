import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export const PhoneMockup = ({ children, className }: PhoneMockupProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Phone frame */}
      <div className="relative w-[280px] h-[580px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[3rem] p-2 shadow-2xl">
        {/* Inner bezel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="relative w-full h-full bg-background rounded-[2.5rem] overflow-hidden">
          {children}
        </div>
        
        {/* Side buttons */}
        <div className="absolute -right-1 top-28 w-1 h-12 bg-zinc-700 rounded-l-sm" />
        <div className="absolute -left-1 top-24 w-1 h-8 bg-zinc-700 rounded-r-sm" />
        <div className="absolute -left-1 top-36 w-1 h-16 bg-zinc-700 rounded-r-sm" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full scale-75" />
    </div>
  );
};
