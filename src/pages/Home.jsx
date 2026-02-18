import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Globe, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveCounter from '../components/LiveCounter';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <LiveCounter />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white -z-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-3xl opacity-40 translate-x-1/3 -translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">New: 80G Tax Benefits Live</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              Make an Impact that <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Actually Matters.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Donate to verified causes, track every rupee with live updates, and get instant tax benefits. 
              The most transparent way to change lives.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/donate" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white text-lg font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Start Donating <ArrowRight size={20} />
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 text-lg font-bold rounded-2xl hover:bg-slate-50 transition-colors">
                How it Works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Metrics Bar */}
      <section className="border-y border-slate-100 bg-white/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Total Donations", value: "₹2.4Cr+", icon: ShieldCheck, color: "text-indigo-600" },
              { label: "Donors Count", value: "14,200+", icon: Users, color: "text-emerald-600" },
              { label: "NGOs Supported", value: "85+", icon: Globe, color: "text-rose-600" },
              { label: "Lives Impacted", value: "1.2M", icon: Heart, color: "text-purple-600" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Transparent Giving in 3 Steps</h2>
            <p className="text-slate-500">We've removed the clutter. Pick a cause, see the cost, and make an impact in seconds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {[
              { title: "Select a Cause", desc: "Browse high-impact projects vetted by our team.", icon: "01" },
              { title: "Choose Amount", desc: "Decide how many lives you want to touch today.", icon: "02" },
              { title: "Track Impact", desc: "Receive live updates and tax certificates instantly.", icon: "03" },
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-xl font-bold text-indigo-600 mb-6 relative z-10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to make a difference?</h2>
          <p className="text-slate-400 text-lg mb-10">Join thousands of changemakers supporting verified causes.</p>
          <Link to="/donate" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/25 transform hover:scale-105 transition-all">
            Start Your Journey <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}