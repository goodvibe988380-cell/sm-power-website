import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleClick = () => {
    const phoneNumber = '919611951518';
    const message = encodeURIComponent('Hello, I would like to inquire about SM Power Solutions electrical services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Tooltip */}
      {isTooltipOpen && (
        <div className="mb-2 p-4 rounded-xl bg-white shadow-lg max-w-[250px] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-heading font-semibold text-dark text-sm">Chat with us</p>
              <p className="text-dark/60 text-xs mt-1">
                Get a quick response on WhatsApp
              </p>
            </div>
            <button
              onClick={() => setIsTooltipOpen(false)}
              className="text-dark/40 hover:text-dark transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsTooltipOpen(true)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        
        {/* Icon */}
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        
        {/* Glow effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
      </button>
    </div>
  );
}
