import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const phoneNumber = '919611951518';
    const message = encodeURIComponent('Hello, I would like to inquire about your MEP consultancy services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
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
        className="group relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
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
