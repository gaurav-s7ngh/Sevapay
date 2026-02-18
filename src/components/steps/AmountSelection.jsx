import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import ImpactCard from '../ImpactCard';
import TaxVisualizer from '../modals/TaxVisualiser';

const CAUSES = [
  { id: 1, title: "Sponsor a Meal", category: "Hunger", unitCost: 40, desc: "Nutritious meal for a child.", raised: 12000, goal: 50000 },
  { id: 2, title: "School Kit", category: "Education", unitCost: 500, desc: "Books, bag & stationery.", raised: 45000, goal: 100000 },
  { id: 3, title: "Cataract Surgery", category: "Health", unitCost: 2000, desc: "Restore vision for an elder.", raised: 15000, goal: 200000 },
];

export default function AmountSelection({ formData, setFormData, onNext, isDesktop = false }) {
  const [showTax, setShowTax] = React.useState(false);

  // Helper to update cart
  const updateCart = (causeId, newQty) => {
    let newCart = [...(formData.cart || [])];
    const cause = CAUSES.find(c => c.id === causeId);
    const existingItemIndex = newCart.findIndex(item => item.id === causeId);

    if (newQty > 0) {
      if (existingItemIndex >= 0) {
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newQty,
          total: cause.unitCost * newQty
        };
      } else {
        newCart.push({
          id: cause.id,
          title: cause.title,
          category: cause.category,
          unitCost: cause.unitCost,
          quantity: newQty,
          total: cause.unitCost * newQty
        });
      }
    } else {
      if (existingItemIndex >= 0) {
        newCart.splice(existingItemIndex, 1);
      }
    }

    const grandTotal = newCart.reduce((sum, item) => sum + item.total, 0);

    setFormData(prev => ({
      ...prev,
      cart: newCart,
      amount: grandTotal
    }));
  };

  useEffect(() => {
    if ((!formData.cart || formData.cart.length === 0) && formData.amount === 0) {
       updateCart(CAUSES[0].id, 1);
    }
  }, []);

  const totalItems = formData.cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">Choose Impact</h2>
        <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
           <ShoppingBag size={12} />
           <span className="text-xs font-bold">{totalItems} Items Selected</span>
        </div>
      </div>

      {/* List - SCROLLBAR REMOVED */}
      {/* Removed: overflow-y-auto, min-h-[300px], custom-scrollbar */}
      <div className="space-y-3 mb-6">
        {CAUSES.map(cause => {
          const inCart = formData.cart?.find(item => item.id === cause.id);
          return (
            <ImpactCard 
              key={cause.id}
              cause={cause}
              isSelected={!!inCart}
              onSelect={(id) => { if (!inCart) updateCart(id, 1); }}
              quantity={inCart?.quantity || 0}
              onUpdateQuantity={updateCart}
            />
          );
        })}
      </div>

      {/* Footer Pushed to Bottom */}
      <div className="mt-auto">
        <div className="flex justify-between items-end mb-2 px-1">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Total Impact</span>
            <div className="text-3xl font-extrabold text-slate-900">
              ₹{formData.amount?.toLocaleString() || 0}
            </div>
          </div>
          <div className="text-right">
             <span className="text-xs text-slate-400 font-bold uppercase block">Lives Touched</span>
             <span className="text-xl font-bold text-indigo-600">{totalItems}</span>
          </div>
        </div>

        <TaxVisualizer 
          amount={formData.amount || 0} 
          isOpen={showTax} 
          onToggle={() => setShowTax(!showTax)}
          isDesktop={isDesktop}
        />

        {!isDesktop && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <ArrowRight size={18} />
          </motion.button>
        )}
      </div>
    </div>
  );
}