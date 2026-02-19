import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#F5F2EB]/95 backdrop-blur-xl border-b border-[#6B8060]/20 py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-[#6B8060] flex items-center justify-center shadow-md">
             <Heart className="text-[#F5F2EB]" size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-[#1A1F16]">
            Smart<span className="text-[#4A5E40]">Donate</span>
          </span>
        </div>
      </div>
    </motion.nav>
  );
}