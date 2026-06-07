import { forwardRef } from 'react';
import LogoMark from '../components/LogoMark';

const Preloader = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo Animation */}
        <div className="relative">
          <LogoMark className="h-24 w-20 animate-pulse-gold" />
        </div>
        
        {/* Text */}
        <div className="text-center">
          <h2 className="font-heading font-bold text-2xl text-slate-900 tracking-wider">
            SM POWER SOLUTIONS
          </h2>
          <p className="font-mono text-xs text-gold/70 mt-2 tracking-[0.3em] uppercase">
            Loading Experience
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gold animate-[loading_2s_ease-in-out_infinite]" />
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
});

Preloader.displayName = 'Preloader';

export default Preloader;
