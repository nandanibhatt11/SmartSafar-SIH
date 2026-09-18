import React, { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Navigation,
  Users,
  SlidersHorizontal,
  Heart,
} from "lucide-react";
import { priceMatches } from "../data";

const API_BASE_URL = "http://localhost:5000/api";

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

  // Authentication
  user,
  onRequireLogin,
}) => {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [savingPlace, setSavingPlace] = useState(null);

  const filteredStays = stays.filter((s) =>
    priceMatches(s.price, maxBudget)
  );

  const filteredFood = food.filter((f) =>
    priceMatches(f.price, maxBudget)
  );

  // Keep the original three-column arrangement.
  const popularPlaces = useMemo(
    () => destinations.filter((d) => d.type === "famous"),
    [destinations]
  );

  const destinationByName = useMemo(() => {
    const map = new Map();

    allDestinations.forEach((d) => {
      map.set(d.name, d);
    });

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

    return names
      .map((name) => destinationByName.get(name))
      .filter(Boolean);
  };

  /*
   * Load the logged-in user's saved places.
   */
  useEffect(() => {
    const loadSavedPlaces = async () => {
      if (!user) {
        setSavedPlaces([]);
        return;
      }

      const token = localStorage.getItem("SmartSafarToken");

      if (!token) {
        setSavedPlaces([]);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/saved-places`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Could not load saved places");
        }

        const result = await response.json();

        setSavedPlaces(result.savedPlaces || []);
      } catch (error) {
        console.error("Saved places error:", error);
      }
    };

    loadSavedPlaces();
  }, [user]);

  /*
   * Check whether a destination is already saved.
   */
  const isSaved = (destination) => {
    return savedPlaces.some(
      (place) =>
        String(place.locationId) === String(destination.id)
    );
  };

  /*
   * Save / remove a destination.
   */
  const handleSavePlace = async (event, destination) => {
    event.stopPropagation();

    // User isn't logged in.
    if (!user) {
      onRequireLogin && onRequireLogin();
      return;
    }

    const token = localStorage.getItem("SmartSafarToken");

    if (!token) {
      onRequireLogin && onRequireLogin();
      return;
    }

    setSavingPlace(destination.id);

    try {
      const alreadySaved = isSaved(destination);

      if (alreadySaved) {
        // REMOVE
        const response = await fetch(
          `${API_BASE_URL}/auth/saved-places/${encodeURIComponent(
            destination.id
          )}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Could not remove place"
          );
        }

        setSavedPlaces(result.savedPlaces || []);
      } else {
        // SAVE
        const response = await fetch(
          `${API_BASE_URL}/auth/saved-places`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              locationId: destination.id,
              name: destination.name,
              city: selectedDestination,
              category: destination.category || "",
              image:
                destination.image ||
                destination.imageUrl ||
                "",
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Could not save place"
          );
        }

        setSavedPlaces(result.savedPlaces || []);
      }
    } catch (error) {
      console.error("Save place error:", error);
      alert(error.message || "Unable to update saved place.");
    } finally {
      setSavingPlace(null);
    }
  };

  const renderAlternative = (alternative) => (
    <button
      key={alternative.id}
      type="button"
      onClick={() =>
        onSelectCard && onSelectCard(alternative)
      }
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
          className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${densityTone(
            alternative.density
          )}`}
        >
          <Users size={12} />
          {alternative.density}%
        </span>
      </div>
    </button>
  );

  return (
    <section
      id="destinations"
      className="border-t border-slate-200 bg-white py-16"
    >
      <div className="mx-auto max-w-7xl px-4">

        {/* Header */}
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
            <label
              htmlFor="categoryFilter"
              className="text-sm font-semibold text-slate-700"
            >
              Category
            </label>

            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={(e) =>
                onCategoryChange &&
                onCategoryChange(e.target.value)
              }
              className="appearance-none cursor-pointer rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 pr-10 text-sm font-bold text-emerald-900 shadow-sm transition-all hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All"
                    ? "All categories"
                    : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget Filter */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="budgetRange"
              className="flex items-center gap-2 text-sm font-bold text-slate-800"
            >
              <SlidersHorizontal
                size={16}
                className="text-emerald-700"
              />

              Adjust Price Range Filter
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
            onChange={(e) =>
              setMaxBudget(Number(e.target.value))
            }
            className="h-2 w-full cursor-pointer rounded-lg bg-slate-200 accent-emerald-600"
          />

          <div className="mt-2 flex justify-between text-xs font-semibold text-slate-400">
            <span>₹200 (Budget)</span>
            <span>₹1,500 (Moderate)</span>
            <span>₹3,000+ (Premium)</span>
          </div>
        </div>

        {/* Places */}
        <h3 className="mb-4 font-display text-xl font-bold">
          Places to explore
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {popularPlaces.map((dest) => {
            const saved = isSaved(dest);

            return (
              <div
                key={dest.id}
                onClick={() =>
                  onSelectCard &&
                  onSelectCard(dest)
                }
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-500 hover:shadow-md"
              >
                {/* Top section */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                      {dest.category}
                    </div>

                    <h4 className="font-display text-lg font-bold text-slate-900">
                      {dest.name}
                    </h4>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {/* SAVE BUTTON */}
                    <button
                      type="button"
                      title={
                        saved
                          ? "Remove from saved places"
                          : "Save this place"
                      }
                      onClick={(e) =>
                        handleSavePlace(e, dest)
                      }
                      disabled={
                        savingPlace === dest.id
                      }
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                        saved
                          ? "border-red-200 bg-red-50 text-red-600"
                          : "border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                      } ${
                        savingPlace === dest.id
                          ? "cursor-wait opacity-50"
                          : ""
                      }`}
                    >
                      <Heart
                        size={17}
                        fill={
                          saved ? "currentColor" : "none"
                        }
                      />
                    </button>

                    {/* CROWD */}
                    <div
                      className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${densityTone(
                        dest.density
                      )}`}
                    >
                      <Users size={13} />
                      {dest.density}%
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-2 text-sm leading-5 text-slate-600">
                  {dest.description}
                </p>

                {/* Buttons */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      onViewMap &&
                        onViewMap(dest);
                    }}
                    className="flex items-center justify-center gap-1 rounded-lg border border-slate-300 py-2 text-xs font-semibold hover:bg-slate-50"
                  >
                    <MapPin size={14} />
                    Map
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();

                      onNavigate &&
                        onNavigate(dest);
                    }}
                    className="flex items-center justify-center gap-1 rounded-lg bg-[#1b6d24] py-2 text-xs font-semibold text-white hover:bg-[#14521b]"
                  >
                    <Navigation size={14} />
                    Navigate
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

        {(filteredStays.length > 0 ||
          filteredFood.length > 0) &&
          null}
      </div>
    </section>
  );
};