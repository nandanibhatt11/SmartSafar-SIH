import React, { useMemo } from "react";
import { MapPin, Navigation, Users, SlidersHorizontal } from "lucide-react";
import { priceMatches } from "../data";

export const OffbeatDestinations = ({
  destinations,
  allDestinations = [],
  stays,
  food,
  selectedDestination,
  onDestinationChange,
  onViewMap,
  onNavigate,
  onSelectCard,
  maxBudget,
  setMaxBudget,
  selectedCategory = "All",
  onCategoryChange,
  categories = ["All"],
}) => {
  const filteredStays = stays.filter((s) => priceMatches(s.price, maxBudget));
  const filteredFood = food.filter((f) => priceMatches(f.price, maxBudget));

  // Keep the original three-column arrangement, but show only popular places here.
  const popularPlaces = useMemo(
    () => destinations.filter((d) => d.type === "famous"),
    [destinations]
  );

  // Used only to find the actual destination object for a recommended alternative.
  const destinationByName = useMemo(() => {
    const map = new Map();
    allDestinations.forEach((d) => map.set(d.name, d));
    return map;
  }, [allDestinations]);

  const densityTone = (n) =>
    n >= 70
      ? "text-red-700 bg-red-50"
      : n >= 40
        ? "text-amber-700 bg-amber-50"
        : "text-emerald-700 bg-emerald-50";

  const getAlternatives = (dest) => {
    const names = Array.isArray(dest.alternatives)
      ? dest.alternatives
      : dest.alternative
        ? [dest.alternative]
        : [];

    return names.map((name) => destinationByName.get(name)).filter(Boolean);
  };

  const renderAlternative = (alternative) => (
    <button
      key={alternative.id}
      type="button"
      onClick={() => onSelectCard && onSelectCard(alternative)}
      className="w-full rounded-lg border border-emerald-200 bg-white p-3 text-left transition-all hover:border-emerald-500 hover:shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">
            Better Alternative
          </div>
          <div className="truncate text-sm font-bold text-slate-900">
            {alternative.name}
          </div>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${densityTone(alternative.density)}`}
        >
          <Users size={12} /> {alternative.density}%
        </span>
      </div>
    </button>
  );

  return (
    <section id="destinations" className="border-t border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header Block — kept in the original arrangement */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-emerald-700">
              Smart destination recommendations
            </div>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Choose a destination. Travel by crowd + budget.
            </h2>
            <p className="mt-2 text-slate-600">
              Famous places are shown first, with quieter alternatives when density is high.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="categoryFilter" className="text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
              className="appearance-none cursor-pointer rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 pr-10 text-sm font-bold text-emerald-900 shadow-sm transition-all hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget Filter — kept in the original position */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="budgetRange" className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <SlidersHorizontal size={16} className="text-emerald-700" /> Adjust Price Range Filter
            </label>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              Up to ₹{maxBudget.toLocaleString()}
            </span>
          </div>

          <input
            id="budgetRange"
            type="range"
            min="200"
            max="3000"
            step="100"
            value={maxBudget}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="h-2 w-full cursor-pointer rounded-lg bg-slate-200 accent-emerald-600"
          />
          <div className="mt-2 flex justify-between text-xs font-semibold text-slate-400">
            <span>₹200 (Budget)</span>
            <span>₹1,500 (Moderate)</span>
            <span>₹3,000+ (Premium)</span>
          </div>
        </div>

        {/* Places to explore — same original grid layout */}
        <h3 className="mb-4 font-display text-xl font-bold">Places to explore</h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {popularPlaces.map((dest) => {
            const crowded = Number(dest.density) >= 70;
            const alternatives = crowded ? getAlternatives(dest) : [];

            return (
              <div
                key={dest.id}
                onClick={() => onSelectCard && onSelectCard(dest)}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-500 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      {dest.category}
                    </div>
                    <h4 className="font-display text-lg font-bold text-slate-900">{dest.name}</h4>
                  </div>
                  <div className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${densityTone(dest.density)}`}>
                    <Users size={13} /> {dest.density}%
                  </div>
                </div>

                <p className="mt-2 text-sm leading-5 text-slate-600">{dest.description}</p>

                {crowded && alternatives.length > 0 && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
                    <div className="mb-2 text-xs font-bold text-emerald-900">
                      Crowded right now? Try these quieter places:
                    </div>
                    <div className="space-y-2">
                      {alternatives.map(renderAlternative)}
                    </div>
                  </div>
                )}

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewMap && onViewMap(dest);
                    }}
                    className="flex items-center justify-center gap-1 rounded-lg border border-slate-300 py-2 text-xs font-semibold hover:bg-slate-50"
                  >
                    <MapPin size={14} /> Map
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate && onNavigate(dest);
                    }}
                    className="flex items-center justify-center gap-1 rounded-lg bg-[#1b6d24] py-2 text-xs font-semibold text-white hover:bg-[#14521b]"
                  >
                    <Navigation size={14} /> Navigate
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {popularPlaces.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No popular places match the selected filters.
          </div>
        )}

        {/* Keep these calculations from the original component without changing the page layout. */}
        {(filteredStays.length > 0 || filteredFood.length > 0) && null}
      </div>
    </section>
  );
};
