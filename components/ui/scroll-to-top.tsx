'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <Button 
        size="lg" 
        variant="outline"
        className="rounded-full w-14 h-14 bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={scrollToTop}
      >
        <ArrowRight className="h-6 w-6 rotate-[-90deg]" />
      </Button>
    </div>
  );
}
