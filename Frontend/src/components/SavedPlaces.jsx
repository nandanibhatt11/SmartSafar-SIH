import React, { useEffect, useState } from "react";
import {
  Heart,
  MapPin,
  ArrowLeft,
  Trash2,
  Navigation,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

export const SavedPlaces = ({
  user,
  onBack,
  onSelectDestination,
}) => {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      if (!user) {
        setSavedPlaces([]);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("SmartSafarToken");

      if (!token) {
        setSavedPlaces([]);
        setLoading(false);
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

        const data = await response.json();

        if (response.ok) {
          setSavedPlaces(data.savedPlaces || []);
        } else {
          console.error(data.message || "Failed to load saved places");
        }
      } catch (error) {
        console.error("Saved places error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPlaces();
  }, [user]);

  const handleRemove = async (locationId) => {
    const token = localStorage.getItem("SmartSafarToken");

    if (!token) return;

    setRemovingId(locationId);

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/saved-places/${locationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSavedPlaces(data.savedPlaces || []);
      } else {
        alert(data.message || "Could not remove place");
      }
    } catch (error) {
      console.error("Remove saved place error:", error);
      alert("Something went wrong while removing the place.");
    } finally {
      setRemovingId(null);
    }
  };

  const handleNavigate = (place) => {
    const query = encodeURIComponent(
      `${place.name}, ${place.city}, Uttarakhand`
    );

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    );
  };

  if (!user) {
    return (
      <section className="min-h-[70vh] bg-white px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Heart
            size={48}
            className="mx-auto mb-4 text-slate-300"
          />

          <h2 className="font-display text-2xl font-bold text-slate-900">
            Login to view your saved places
          </h2>

          <p className="mt-2 text-slate-500">
            Save your favourite destinations and access them anytime.
          </p>

          <button
            onClick={onBack}
            className="mt-6 rounded-xl bg-[#1b6d24] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#14521b]"
          >
            Back to destinations
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-white px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={onBack}
              className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-700"
            >
              <ArrowLeft size={16} />
              Back to destinations
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
                <Heart
                  size={22}
                  className="text-red-500"
                  fill="currentColor"
                />
              </div>

              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">
                  Saved Places
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your favourite destinations in one place.
                </p>
              </div>
            </div>
          </div>

          {!loading && savedPlaces.length > 0 && (
            <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
              {savedPlaces.length}{" "}
              {savedPlaces.length === 1 ? "place" : "places"} saved
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <div className="text-sm font-semibold text-slate-500">
              Loading your saved places...
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && savedPlaces.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
            <Heart
              size={46}
              className="mx-auto mb-4 text-slate-300"
            />

            <h3 className="font-display text-xl font-bold text-slate-900">
              No saved places yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              When you find a destination you like, click the
              heart button on its card. It will appear here.
            </p>

            <button
              onClick={onBack}
              className="mt-6 rounded-xl bg-[#1b6d24] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#14521b]"
            >
              Explore destinations
            </button>
          </div>
        )}

        {/* Saved places */}
        {!loading && savedPlaces.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {savedPlaces.map((place) => (
              <div
                key={place.locationId}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-400 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {place.image ? (
                    <img
                      src={place.image}
                      alt={place.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <MapPin
                        size={40}
                        className="text-slate-300"
                      />
                    </div>
                  )}

                  <div className="absolute right-3 top-3 rounded-full bg-white/95 p-2 shadow-sm">
                    <Heart
                      size={18}
                      className="text-red-500"
                      fill="currentColor"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    {place.category || "Destination"}
                  </div>

                  <h3 className="mt-1 font-display text-xl font-bold text-slate-900">
                    {place.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin size={14} />
                    {place.city}, Uttarakhand
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectDestination) {
                          onSelectDestination(place);
                        }
                      }}
                      className="rounded-lg border border-slate-300 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View Place
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate(place)}
                      className="flex items-center justify-center gap-1 rounded-lg bg-[#1b6d24] py-2 text-xs font-semibold text-white transition hover:bg-[#14521b]"
                    >
                      <Navigation size={14} />
                      Navigate
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(place.locationId)
                    }
                    disabled={removingId === place.locationId}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-50"
                  >
                    <Trash2 size={14} />

                    {removingId === place.locationId
                      ? "Removing..."
                      : "Remove from saved"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};