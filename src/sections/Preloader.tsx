import { forwardRef } from 'react';
import { Zap } from 'lucide-react';

const Preloader = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-gold/30 flex items-center justify-center animate-pulse-gold">
            <div className="w-16 h-16 rounded-full border-2 border-gold/50 flex items-center justify-center">
              <Zap className="w-8 h-8 text-gold animate-pulse" />
            </div>
          </div>
          {/* Rotating ring */}
          <div className="absolute inset-0 w-20 h-20 rounded-full border-t-2 border-gold animate-spin" style={{ animationDuration: '1s' }} />
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
