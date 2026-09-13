import React from "react";
import { Radio, TrainFront, CloudSun, Clock3, Smile, MapPin } from "lucide-react";

export const TelemetrySection = ({ 
  telemetry, 
  selectedDestination, 
  onDestinationChange,
  cities = [],
  loading = false
}) => {
  const cards = [
    {
      label: "Live Density",
      value: `${telemetry.liveDensity}%`,
      note: telemetry.densityNote,
      icon: Radio,
    },
    {
      label: "Transit Load",
      value: telemetry.transit,
      note: "Current route pressure",
      icon: TrainFront,
    },
    {
      label: "Weather",
      value: telemetry.weather,
      note: "Conditions at destination",
      icon: CloudSun,
    },
    {
      label: "Quiet Window",
      value: telemetry.quietWindow,
      note: "Best time to explore",
      icon: Clock3,
    },
    {
      label: "Experience",
      value: telemetry.experience,
      note: "Predicted comfort score",
      icon: Smile,
    },
  ];

  return (
    <section id="telemetry" className="bg-[#faf8ff] pt-12 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Destination Dropdown Bar placed above Live Status */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 bg-green-700  p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <MapPin size={20} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-black">
                Location Selector
              </span>
              <h3 className="text-sm font-bold text-white">
                Choose region to view live telemetry
              </h3>
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedDestination}
              disabled={loading}
              onChange={(e) => onDestinationChange && onDestinationChange(e.target.value)}
              className="appearance-none cursor-pointer rounded-xl border transition-transform hover:scale-105 border-emerald-300 bg-white px-4 py-2.5 pr-10 text-sm font-bold text-emerald-900 shadow-sm  hover:bg-green-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {cities.length > 0 ? cities.map((city) => (
                <option key={city._id || city.name} value={city.name}>
                  {city.name}
                </option>
              )) : (
                <>
                  <option className="py-5 text-gray-800 bg-black" value="Mussoorie">Mussoorie</option>
                  <option className="py-5 text-gray-800 bg-black" value="Dehradun">Dehradun</option>
                </>
              )}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-700 font-bold">
              ▼
            </div>
          </div>
        </div>

        {/* Live Status Header */}
        <div className="flex flex-col justify-between gap-4 pb-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />{" "}
              DEMO DENSITY DATA
            </div>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Live Status: {telemetry.name}, {telemetry.state}
            </h2>
          </div>
          <div className="text-xs text-slate-500">
            Live data from Smartसफर backend • MongoDB
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map(({ label, value, note, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border bg-gradient-to-r  from-emerald-50 via-green-100 to-emerald-200 border-slate-200  p-10 transition-transform hover:scale-110 hover:border-black shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-bold text-slate-500">{label}</div>
                <Icon size={20} className="text-emerald-700" />
              </div>
              <div className="font-display text-3xl font-bold text-slate-900">
                {value}
              </div>
              <p className="mt-1 text-xs text-slate-600">{note}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};