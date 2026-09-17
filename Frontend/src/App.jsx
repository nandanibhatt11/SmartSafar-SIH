import React, { useEffect, useMemo, useState } from "react";
import {
  Menu,
  X,
  MapPinned,
  User,
  LogOut,
  Heart,
} from "lucide-react";

import { YatraSenseLogo } from "./components/YatraSenseLogo";
import { HeroSection } from "./components/HeroSection";
import { TelemetrySection } from "./components/TelemetrySection";
import { OffbeatDestinations } from "./components/OffbeatDestinations";
import { LiveCrowdMap } from "./components/LiveCrowdMap";
import LocationDetailModal from "./components/LocationDetailModal";
import AuthModal from "./components/AuthModal";
import { SavedPlaces } from "./components/SavedPlaces";

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

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("yatrasenseUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [showSavedPlaces, setShowSavedPlaces] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [focusMarker, setFocusMarker] = useState(null);

  const [selectedDestination, setSelectedDestination] =
    useState("Mussoorie");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [maxBudget, setMaxBudget] = useState(2500);

  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cityData, setCityData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeModalDest, setActiveModalDest] =
    useState(null);

  // =========================================================
  // LOAD CITIES
  // =========================================================

  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/cities`
        );

        if (!response.ok) {
          throw new Error("Could not load cities");
        }

        const result = await response.json();

        setCities(result.data || []);
      } catch (err) {
        console.error("City API error:", err);

        setError(
          "Unable to connect to the YatraSense backend."
        );
      }
    };

    loadCities();
  }, []);

  // =========================================================
  // LOAD SELECTED CITY
  // =========================================================

  useEffect(() => {
    const loadSelectedCity = async () => {
      setLoading(true);
      setError("");
      setActiveModalDest(null);
      setFocusMarker(null);
      setSelectedCategory("All");

      try {
        const [cityResponse, locationsResponse] =
          await Promise.all([
            fetch(
              `${API_BASE_URL}/cities/${encodeURIComponent(
                selectedDestination
              )}`
            ),

            fetch(
              `${API_BASE_URL}/locations?city=${encodeURIComponent(
                selectedDestination
              )}`
            ),
          ]);

        if (!cityResponse.ok) {
          throw new Error("Could not load city data");
        }

        if (!locationsResponse.ok) {
          throw new Error("Could not load locations");
        }

        const cityResult = await cityResponse.json();
        const locationsResult =
          await locationsResponse.json();

        const city = cityResult.data || {};
        const destinationList =
          locationsResult.data || [];

        setCityData({
          ...city,
          name:
            city.name || selectedDestination,
          destinations: destinationList,
          stays: city.stays || [],
          food: city.food || [],
        });

        setLocations(destinationList);
      } catch (err) {
        console.error(
          "Location API error:",
          err
        );

        setLocations([]);
        setCityData(null);

        setError(
          "Unable to load data for this city. Make sure the backend is running on port 5000."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSelectedCity();
  }, [selectedDestination]);

  // =========================================================
  // CURRENT CITY DATA
  // =========================================================

  const current = cityData || {
    ...emptyCity,
    name: selectedDestination,
  };

  // =========================================================
  // CATEGORIES
  // =========================================================

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          locations
            .map((destination) => destination.category)
            .filter(Boolean)
        )
      ),
    ],
    [locations]
  );

  // =========================================================
  // FILTER DESTINATIONS
  // =========================================================

  const filteredDestinations = useMemo(() => {
    return locations.filter((destination) => {
      if (
        selectedCategory !== "All" &&
        destination.category !== selectedCategory
      ) {
        return false;
      }

      const price = Number(
        destination.price ?? 0
      );

      return price <= maxBudget;
    });
  }, [
    locations,
    maxBudget,
    selectedCategory,
  ]);

  // =========================================================
  // MAP MARKERS
  // =========================================================

  const markers = useMemo(() => {
    return filteredDestinations
      .filter(
        (destination) =>
          Number.isFinite(
            Number(destination.lat)
          ) &&
          Number.isFinite(
            Number(destination.lng)
          )
      )
      .map((destination) => ({
        ...destination,

        crowdPercent:
          Number(destination.density ?? 0),

        crowdStatus:
          Number(destination.density ?? 0) >= 70
            ? "high"
            : Number(destination.density ?? 0) >= 40
              ? "moderate"
              : "low",
      }));
  }, [filteredDestinations]);

  // =========================================================
  // SCROLL
  // =========================================================

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMobileOpen(false);
  };

  // =========================================================
  // CHANGE DESTINATION / CITY
  // =========================================================

  const changeDestination = (name) => {
    if (
      !name ||
      name === selectedDestination
    ) {
      return;
    }

    setSelectedDestination(name);
    setSelectedCategory("All");
    setFocusMarker(null);
    setActiveModalDest(null);
    setShowSavedPlaces(false);

    setTimeout(() => {
      scrollTo("telemetry");
    }, 0);
  };

  // =========================================================
  // FOCUS MAP MARKER
  // =========================================================

  const focus = (destination) => {
    setFocusMarker(destination);
    scrollTo("live-map");
  };

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setShowAuth(false);
    setShowProfile(false);
    setShowSavedPlaces(false);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("yatrasenseToken");
    localStorage.removeItem("yatrasenseUser");

    setUser(null);
    setShowProfile(false);
    setShowSavedPlaces(false);
    setActiveModalDest(null);
  };

  // =========================================================
  // OPEN SAVED PLACES
  // =========================================================

  const openSavedPlaces = () => {
    if (!user) {
      setShowAuth(true);
      setShowProfile(false);
      setMobileOpen(false);
      return;
    }

    setShowSavedPlaces(true);
    setShowProfile(false);
    setMobileOpen(false);
    setActiveModalDest(null);
    setFocusMarker(null);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  // =========================================================
  // BACK TO HOME
  // =========================================================

  const backToHome = () => {
    setShowSavedPlaces(false);
    setShowProfile(false);
    setMobileOpen(false);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  // =========================================================
  // OPEN A SAVED PLACE
  // =========================================================

  const handleSavedPlaceSelect = (place) => {
    const fullDestination = locations.find(
      (destination) =>
        String(destination.id) ===
          String(place.locationId) ||
        String(destination._id) ===
          String(place.locationId)
    );

    setShowSavedPlaces(false);

    if (fullDestination) {
      setActiveModalDest(fullDestination);
      return;
    }

    if (
      place.city &&
      place.city !== selectedDestination
    ) {
      setSelectedDestination(place.city);
    }
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="min-h-screen bg-[#ffffff]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-[1100] border-b border-slate-200 bg-transparent backdrop-blur">

        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}

          <button
            type="button"
            onClick={backToHome}
          >
            <YatraSenseLogo />
          </button>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <nav
            className={`${
              mobileOpen ? "flex" : "hidden"
            } absolute left-0 right-0 top-12 flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 shadow-md md:static md:ml-auto md:flex md:flex-row md:items-center md:gap-10 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >

            {/* LIVE STATUS */}

            <button
              type="button"
              onClick={() => {
                if (showSavedPlaces) {
                  setShowSavedPlaces(false);

                  setTimeout(() => {
                    scrollTo("telemetry");
                  }, 50);
                } else {
                  scrollTo("telemetry");
                }
              }}
              className="text-left text-sm font-semibold text-slate-600 hover:text-emerald-700"
            >
              Live Status
            </button>

            {/* DESTINATIONS */}

            <button
              type="button"
              onClick={() => {
                if (showSavedPlaces) {
                  setShowSavedPlaces(false);

                  setTimeout(() => {
                    scrollTo("destinations");
                  }, 50);
                } else {
                  scrollTo("destinations");
                }
              }}
              className="text-left text-sm font-semibold text-slate-600 hover:text-emerald-700"
            >
              Destinations
            </button>

            {/* LIVE MAP */}

            <button
              type="button"
              onClick={() => {
                if (showSavedPlaces) {
                  setShowSavedPlaces(false);

                  setTimeout(() => {
                    scrollTo("live-map");
                  }, 50);
                } else {
                  scrollTo("live-map");
                }
              }}
              className="flex items-center gap-2 text-left text-sm font-semibold text-slate-600 hover:text-emerald-700"
            >
              <MapPinned size={15} />
              Live Map
            </button>

            {/* SAVED */}

            <button
              type="button"
              onClick={openSavedPlaces}
              className={`flex items-center gap-2 text-left text-sm font-semibold transition ${
                showSavedPlaces
                  ? "text-emerald-700"
                  : "text-slate-600 hover:text-emerald-700"
              }`}
            >
              <Heart
                size={16}
                fill={
                  showSavedPlaces
                    ? "currentColor"
                    : "none"
                }
              />

              Saved
            </button>

          </nav>

          {/* =================================================
              PROFILE / LOGIN
          ================================================= */}

          <div className="relative ml-8 hidden md:block">

            {user ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setShowProfile(
                      (value) => !value
                    )
                  }
                  className="flex items-center gap-3 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-100"
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-white">
                    <User size={15} />
                  </div>

                  <span className="max-w-[120px] truncate">
                    {user.name}
                  </span>

                </button>

                {/* PROFILE DROPDOWN */}

                {showProfile && (
                  <div className="absolute right-0 top-11 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">

                    <div className="border-b border-slate-100 pb-3">

                      <p className="font-bold text-slate-900">
                        {user.name}
                      </p>

                      <p className="mt-1 break-all text-xs text-slate-500">
                        {user.email}
                      </p>

                      {user.phone && (
                        <p className="mt-1 text-xs text-slate-500">
                          {user.phone}
                        </p>
                      )}

                    </div>

                    {/* MY SAVED PLACES */}

                    <button
                      type="button"
                      onClick={openSavedPlaces}
                      className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Heart size={16} />

                      My Saved Places
                    </button>

                    {/* LOGOUT */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={16} />

                      Logout
                    </button>

                  </div>
                )}

              </>
            ) : (

              <button
                type="button"
                onClick={() =>
                  setShowAuth(true)
                }
                className="flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                <User size={16} />
                Login
              </button>

            )}

          </div>

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                (value) => !value
              )
            }
            className="rounded-lg p-2 md:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main>

        {showSavedPlaces ? (

          /* =================================================
             SAVED PLACES PAGE
          ================================================= */

          <SavedPlaces
            user={user}
            onBack={backToHome}
            onSelectDestination={
              handleSavedPlaceSelect
            }
          />

        ) : (

          /* =================================================
             NORMAL HOME PAGE
          ================================================= */

          <>

            {/* HERO */}

            <HeroSection
              onExplore={() =>
                scrollTo("telemetry")
              }
              onViewMap={() =>
                scrollTo("live-map")
              }
            />

            {/* BACKEND ERROR */}

            {error && (
              <div className="mx-auto max-w-7xl px-4 pt-6">

                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  {error}
                </div>

              </div>
            )}

            {/* =================================================
                TELEMETRY
            ================================================= */}

            <TelemetrySection
              telemetry={{
                ...current,
                name: selectedDestination,
              }}
              selectedDestination={
                selectedDestination
              }
              onDestinationChange={
                changeDestination
              }
              cities={cities}
              loading={loading}
            />

            {/* =================================================
                DESTINATIONS
            ================================================= */}

            <div id="destinations">

              <OffbeatDestinations
                destinations={
                  filteredDestinations
                }
                allDestinations={
                  locations
                }
                stays={
                  current.stays || []
                }
                food={
                  current.food || []
                }
                selectedDestination={
                  selectedDestination
                }
                onDestinationChange={
                  changeDestination
                }
                onViewMap={
                  focus
                }
                onNavigate={
                  focus
                }
                onSelectCard={
                  setActiveModalDest
                }
                selectedCategory={
                  selectedCategory
                }
                onCategoryChange={
                  setSelectedCategory
                }
                categories={
                  categories
                }
                maxBudget={
                  maxBudget
                }
                setMaxBudget={
                  setMaxBudget
                }
                loading={
                  loading
                }
                user={
                  user
                }
                onRequireLogin={() =>
                  setShowAuth(true)
                }
              />

            </div>

            {/* =================================================
                LIVE CROWD MAP
            ================================================= */}

            <section
              id="live-map"
              className="border-t border-slate-200 bg-white py-16"
            >

              <div className="mx-auto max-w-7xl px-4">

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                  <div>

                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-700">

                      <MapPinned size={15} />

                      Crowd intelligence

                    </div>

                    <h2 className="mt-1 font-display text-3xl font-bold">

                      Live Density Map —{" "}

                      {selectedDestination}

                    </h2>

                  </div>

                  <div className="rounded-lg bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800">

                    {markers.length} mapped locations

                  </div>

                </div>

                <LiveCrowdMap
                  markers={markers}
                  focusMarker={
                    focusMarker
                  }
                  center={
                    current.center
                  }
                  onSelectMarker={
                    setActiveModalDest
                  }
                />

              </div>

            </section>

          </>

        )}

      </main>

      {/* =====================================================
          LOCATION DETAIL MODAL
      ===================================================== */}

      {!showSavedPlaces && (
        <LocationDetailModal
          destination={
            activeModalDest
          }
          cityData={
            current
          }
          onClose={() =>
            setActiveModalDest(null)
          }
          onSelectDestination={
            setActiveModalDest
          }
        />
      )}

      {/* =====================================================
          AUTH MODAL
      ===================================================== */}

      {showAuth && (
        <AuthModal
          onClose={() =>
            setShowAuth(false)
          }
          onLogin={
            handleLogin
          }
        />
      )}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-slate-950 py-3 text-slate-300">

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6">

          <div className="flex shrink-0 items-center">
            <YatraSenseLogo />
          </div>

          <p className="text-xs text-slate-400">
            Travel Smart. Experience More. Avoid the Crowd.
          </p>

        </div>

      </footer>

    </div>
  );
}