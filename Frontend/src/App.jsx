import React, { useEffect, useMemo, useState } from "react";
import { Menu, X, MapPinned } from "lucide-react";
import { YatraSenseLogo } from "./components/YatraSenseLogo";
import { HeroSection } from "./components/HeroSection";
import { TelemetrySection } from "./components/TelemetrySection";
import { OffbeatDestinations } from "./components/OffbeatDestinations";
import { LiveCrowdMap } from "./components/LiveCrowdMap";
import LocationDetailModal from "./components/LocationDetailModal";

const API_BASE_URL = "http://localhost:5000/api";

const emptyCity = {
  name: "Mussoorie",
  state: "Uttarakhand",
  liveDensity: 0,
  densityNote: "Loading live density...",
  transit: "—",
  weather: "—",
  quietWindow: "—",
  experience: "—",
  center: [30.4598, 78.0667],
  stays: [],
  food: [],
  destinations: [],
};

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focusMarker, setFocusMarker] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState("Mussoorie");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxBudget, setMaxBudget] = useState(2500);

  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeModalDest, setActiveModalDest] = useState(null);

  // Load the available cities once from the backend.
  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cities`);
        if (!response.ok) throw new Error("Could not load cities");

        const result = await response.json();
        setCities(result.data || []);
      } catch (err) {
        console.error("City API error:", err);
        setError("Unable to connect to the YatraSense backend.");
      }
    };

    loadCities();
  }, []);

  // Load the selected city's telemetry and locations from MongoDB.
  useEffect(() => {
    const loadSelectedCity = async () => {
      setLoading(true);
      setError("");
      setActiveModalDest(null);
      setFocusMarker(null);
      setSelectedCategory("All");

      try {
        const [cityResponse, locationsResponse] = await Promise.all([
          fetch(
            `${API_BASE_URL}/cities/${encodeURIComponent(selectedDestination)}`,
          ),
          fetch(
            `${API_BASE_URL}/locations?city=${encodeURIComponent(selectedDestination)}`,
          ),
        ]);

        if (!cityResponse.ok) throw new Error("Could not load city data");
        if (!locationsResponse.ok) throw new Error("Could not load locations");

        const cityResult = await cityResponse.json();
        const locationsResult = await locationsResponse.json();

        const city = cityResult.data || {};
        const destinationList = locationsResult.data || [];

        // The backend stores city telemetry separately from locations.
        // Combine them here so the existing frontend components can stay unchanged.
        setCityData({
          ...city,
          name: city.name || selectedDestination,
          destinations: destinationList,
          stays: city.stays || [],
          food: city.food || [],
        });
        setLocations(destinationList);
      } catch (err) {
        console.error("Location API error:", err);
        setLocations([]);
        setCityData(null);
        setError(
          "Unable to load data for this city. Make sure the backend is running on port 5000.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadSelectedCity();
  }, [selectedDestination]);

  const current = cityData || { ...emptyCity, name: selectedDestination };

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(locations.map((d) => d.category).filter(Boolean))),
    ],
    [locations],
  );

  const filteredDestinations = useMemo(() => {
    return locations.filter((destination) => {
      if (
        selectedCategory !== "All" &&
        destination.category !== selectedCategory
      ) {
        return false;
      }

      const price = Number(destination.price ?? 0);
      return price <= maxBudget;
    });
  }, [locations, maxBudget, selectedCategory]);

  const markers = useMemo(
    () =>
      filteredDestinations
        .filter(
          (destination) =>
            Number.isFinite(Number(destination.lat)) &&
            Number.isFinite(Number(destination.lng)),
        )
        .map((destination) => ({
          ...destination,
          crowdPercent: destination.density,
          crowdStatus:
            destination.density >= 70
              ? "high"
              : destination.density >= 40
                ? "moderate"
                : "low",
        })),
    [filteredDestinations],
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const changeDestination = (name) => {
    if (!name || name === selectedDestination) return;
    setSelectedDestination(name);
    setSelectedCategory("All");
    setFocusMarker(null);
    setActiveModalDest(null);
    setTimeout(() => scrollTo("telemetry"), 0);
  };

  const focus = (destination) => {
    setFocusMarker(destination);
    scrollTo("live-map");
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="sticky top-0 z-[1100] border-b border-slate-200 bg-transparent hover:bg-transparent backdrop-blur">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <YatraSenseLogo />
          </button>

          <nav
            className={`${
              mobileOpen ? "flex" : "hidden"
            } absolute left-0 right-0 top-12 flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 shadow-md md:static md:ml-auto md:flex md:flex-row md:gap-10 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            <button
              onClick={() => scrollTo("telemetry")}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-700"
            >
              Live Status
            </button>
            <button
              onClick={() => scrollTo("destinations")}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-700"
            >
              Destinations
            </button>
            <button
              onClick={() => scrollTo("live-map")}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-700"
            >
              Live Map
            </button>
          </nav>

          <button
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-lg p-2 md:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <HeroSection
          onExplore={() => scrollTo("telemetry")}
          onViewMap={() => scrollTo("live-map")}
        />

        {error && (
          <div className="mx-auto max-w-7xl px-4 pt-6">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          </div>
        )}

        <TelemetrySection
          telemetry={{ ...current, name: selectedDestination }}
          selectedDestination={selectedDestination}
          onDestinationChange={changeDestination}
          cities={cities}
          loading={loading}
        />

        <div id="destinations">
          <OffbeatDestinations
            destinations={filteredDestinations}
            allDestinations={locations}
            stays={current.stays || []}
            food={current.food || []}
            selectedDestination={selectedDestination}
            onDestinationChange={changeDestination}
            onViewMap={focus}
            onNavigate={focus}
            onSelectCard={setActiveModalDest}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            maxBudget={maxBudget}
            setMaxBudget={setMaxBudget}
            loading={loading}
          />
        </div>

        <section
          id="live-map"
          className="border-t border-slate-200 bg-white py-16"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-700">
                  <MapPinned size={15} /> Crowd intelligence
                </div>
                <h2 className="mt-1 font-display text-3xl font-bold">
                  Live Density Map — {selectedDestination}
                </h2>
              </div>
              <div className="rounded-lg bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800">
                {markers.length} mapped locations
              </div>
            </div>

            <LiveCrowdMap
              markers={markers}
              focusMarker={focusMarker}
              center={current.center}
              onSelectMarker={setActiveModalDest}
            />
          </div>
        </section>
      </main>

      <LocationDetailModal
        destination={activeModalDest}
        cityData={current}
        onClose={() => setActiveModalDest(null)}
        onSelectDestination={setActiveModalDest}
      />

      <footer className="bg-slate-950 py-7 text-slate-300">
        <div className="mx-auto flex max-w-4xl flex-col justify-between gap-5 px-4 md:flex-row md:items-center">
          <YatraSenseLogo />
          <p className="text-xs text-slate-400">
            Travel Smart. Experience More. Avoid the Crowd.
          </p>
        </div>
      </footer>
    </div>
  );
}
