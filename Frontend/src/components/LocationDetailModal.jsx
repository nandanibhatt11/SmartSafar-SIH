import React, { useState } from "react";
import { Sparkles, ArrowLeft, Home, MapPin, CheckCircle } from "lucide-react";

const LocationDetailModal = ({
  destination,
  cityData,
  onClose,
  onSelectDestination,
}) => {
  const [selectedStay, setSelectedStay] = useState(null);

  if (!destination || !cityData) return null;

  const currentDensity = destination.density ?? destination.crowdPercent ?? 0;

  // Find all matching alternative location objects
  const alternativeNames = destination.alternatives?.length
    ? destination.alternatives
    : destination.alternative
      ? [destination.alternative]
      : [];

  const alternativeSpots = (cityData.destinations || []).filter((d) =>
    alternativeNames.includes(d.name),
  );

  // Get available stays for the current city
  const homestays = cityData.stays || [];

  const handleSelectAlternative = (alt) => {
    setSelectedStay(null);
    if (onSelectDestination) {
      onSelectDestination(alt);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-[1200]">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => {
            setSelectedStay(null);
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold p-1 z-10"
        >
          ✕
        </button>

        {/* VIEW 1: STAY DETAILS VIEW */}
        {selectedStay ? (
          <div>
            <button
              onClick={() => setSelectedStay(null)}
              className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline mb-4"
            >
              <ArrowLeft size={14} /> Back to {destination.name}
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {selectedStay.kind || "Homestay"}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  selectedStay.density >= 50
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                👥 {selectedStay.density}% crowd
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              {selectedStay.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <MapPin size={14} /> Near {destination.name},{" "}
              {cityData.state || "Uttarakhand"}
            </p>

            <div className="my-5 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-emerald-800 font-semibold uppercase">
                  Pricing
                </p>
                <p className="text-2xl font-extrabold text-emerald-900">
                  ₹{selectedStay.price}
                  <span className="text-xs font-normal"> / night</span>
                </p>
              </div>
              <button
                onClick={() =>
                  alert(`Booking inquiry sent for ${selectedStay.name}!`)
                }
                className="bg-[#1b6d24] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#14521b] transition-all shadow-sm"
              >
                Reserve Stay
              </button>
            </div>

            <div className="space-y-3 border-t border-gray-100 pt-4">
              <h3 className="text-sm font-bold text-gray-800">
                Stay Highlights
              </h3>
              <ul className="text-xs text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle
                    size={14}
                    className="text-emerald-600 shrink-0"
                  />{" "}
                  Verified local host & Pahadi hospitality
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle
                    size={14}
                    className="text-emerald-600 shrink-0"
                  />{" "}
                  Quiet surroundings away from high traffic noise
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle
                    size={14}
                    className="text-emerald-600 shrink-0"
                  />{" "}
                  Wi-Fi & power backup available
                </li>
              </ul>
            </div>

            {selectedStay.alternative && (
              <div className="mt-5 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                <b>Note:</b> {selectedStay.alternative}
              </div>
            )}
          </div>
        ) : (
          /* VIEW 2: LOCATION DETAILS VIEW */
          <div>
            <span
              className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${
                destination.type === "famous"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {destination.type === "famous"
                ? "Famous Place"
                : "Quieter Alternative"}
            </span>

            {destination?.image && (
              <img
                src={`http://localhost:5173${destination.image}`}
                alt={destination.name}
                className="w-full h-64 object-cover rounded-xl mt-4"
              />
            )}

            <h2 className="text-2xl font-bold text-gray-900 mt-2">
              {destination.name}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {destination.description}
            </p>

            {/* nsity Meter */}
            <div className="my-5 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Live Crowd Density
                </span>
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-full ${
                    currentDensity >= 70
                      ? "bg-red-100 text-red-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  👥 {currentDensity}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${currentDensity >= 70 ? "bg-red-500" : "bg-emerald-500"}`}
                  style={{ width: `${currentDensity}%` }}
                ></div>
              </div>
            </div>

            {/* Homestays Section */}
            <div className="mb-6">
              <h3 className="text-md font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                <Home size={16} className="text-emerald-700" /> Available
                Homestays & Stays
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Click any stay below to view pricing & details
              </p>

              <div className="space-y-2">
                {homestays.length > 0 ? (
                  homestays.map((stay) => (
                    <div
                      key={stay.id}
                      onClick={() => setSelectedStay(stay)}
                      className="p-3 border border-gray-200 hover:border-emerald-500 rounded-xl flex justify-between items-center bg-gray-50 hover:bg-emerald-50/50 cursor-pointer transition-all group"
                    >
                      <div>
                        <p className="font-semibold text-gray-800 text-sm group-hover:text-emerald-800">
                          {stay.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {stay.kind} • {stay.density}% crowd
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-emerald-700">
                          ₹{stay.price}/night
                        </span>
                        <p className="text-[10px] text-emerald-600 font-semibold underline">
                          View Details →
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">
                    No homestays available.
                  </p>
                )}
              </div>
            </div>

            {/* Alternative Place Section */}
            <div>
              <h3 className="text-md font-bold text-gray-800 mb-1">
                🌿 Less Crowded Alternatives
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Click any option below to open its location details
              </p>
              {alternativeSpots.length > 0 ? (
                <div className="space-y-2">
                  {alternativeSpots.map((alternativeSpot) => (
                    <div
                      key={alternativeSpot.id}
                      onClick={() => handleSelectAlternative(alternativeSpot)}
                      className="p-4 bg-emerald-50 border border-emerald-200 hover:border-emerald-500 rounded-xl cursor-pointer transition-all hover:shadow-md group"
                    >
                      <div className="flex justify-between items-center mb-1 gap-3">
                        <h4 className="font-bold text-emerald-900 group-hover:underline flex items-center gap-1">
                          {alternativeSpot.name}{" "}
                          <Sparkles size={14} className="text-emerald-600" />
                        </h4>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-200 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          👥 {alternativeSpot.density}% crowd
                        </span>
                      </div>
                      <p className="text-xs text-emerald-700 mt-1">
                        {alternativeSpot.description}
                      </p>
                      <span className="inline-block text-[11px] font-bold text-emerald-800 mt-2 underline">
                        Open {alternativeSpot.name} details →
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  This spot is already a quieter alternative!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetailModal;
