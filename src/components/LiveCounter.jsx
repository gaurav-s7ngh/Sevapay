import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity } from 'lucide-react';

export default function LiveCounter() {
  const [count, setCount] = useState(14205);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const shouldUpdate = Math.random() > 0.6;
      if (shouldUpdate) {
        setCount(prev => prev + 1);
        const names = ["Aarav", "Priya", "Rahul", "Ananya", "Vikram"];
        const cities = ["Mumbai", "Delhi", "Bangalore", "Pune"];
        setNotification(`${names[Math.floor(Math.random() * names.length)]} from ${cities[Math.floor(Math.random() * cities.length)]} just donated!`);
        setTimeout(() => setNotification(null), 3000);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Counter Pill - Adjusted top to sit below Navbar or nicely in corner */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-4 flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-xl">
             <Activity size={20} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Impact Makers</p>
            <motion.p 
                key={count}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-xl font-extrabold text-slate-900 tabular-nums"
            >
                {count.toLocaleString()}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3 bg-slate-900 text-white rounded-xl shadow-2xl shadow-slate-900/20 max-w-sm"
          >
            <div className="bg-white/10 p-1.5 rounded-full shrink-0">
              <Zap size={14} className="text-yellow-400" fill="currentColor" />
            </div>
            <span className="text-sm font-medium">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}