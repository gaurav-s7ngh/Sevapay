import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DonatePage from './pages/Donate';
import Dashboard from './pages/Dashboard';

// Mock Component for Missing Pages
const ComingSoon = ({ title }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
    <h1 className="text-3xl font-bold text-slate-300 mb-2">Coming Soon</h1>
    <p className="text-slate-400">{title} is under construction.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Placeholders for requirements */}
          <Route path="/ngo-panel" element={<ComingSoon title="NGO Partner Panel" />} />
          <Route path="/impact" element={<ComingSoon title="Impact Reports" />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}