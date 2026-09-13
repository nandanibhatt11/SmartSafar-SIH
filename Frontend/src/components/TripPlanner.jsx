import React from "react";
import { SlidersHorizontal } from "lucide-react";

export const TripPlanner = ({ maxBudget, setMaxBudget }) => {
  return (
    <section id="planner" className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Price Scroll / Slider Bar */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="budgetRange" className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-emerald-700" /> Adjust Price Range Filter
            </label>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Up to ₹{maxBudget.toLocaleString()}
            </span>
          </div>
          
          <input
            id="budgetRange"
            type="range"
            min="200"
            max="5000"
            step="100"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />
          <div className="flex justify-between text-xs font-semibold text-slate-400 mt-2">
            <span>₹200 (Budget)</span>
            <span>₹2,500 (Moderate)</span>
            <span>₹5,000+ (Premium)</span>
          </div>
        </div>
      </div>
    </section>
  );
};