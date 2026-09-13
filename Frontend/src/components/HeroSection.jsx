import React, { useState, useEffect } from "react";
import { Compass } from "lucide-react";

const backgroundImages = [
  "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Auli-Snow.jpg",
  "https://s7ap1.scene7.com/is/image/incredibleindia/cola-beach-goa-blog-ntr-hero?qlt=82&ts=1742160482227",
  "https://i.pinimg.com/736x/4a/97/62/4a976239cfa80cc757ccc8569c48a794.jpg",
  "https://d3gz7d9rg09miz.cloudfront.net/travel/1732269301670-491353181.jpg",
  "https://hblimg.mmtcdn.com/content/hubble/img/landsdown/mmt/destination/m_destination-lansdowne-landscape_l_400_640.jpg",
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRaVUpp0C6VwruuDJwN-IhTzZ9fZeJZZF-A79QmPpLeKh45IDhE",
  "https://cpjlcwamma.cloudimg.io/wp-content/uploads/2026/05/Varkala-Kerala.png?width=1180&height=600&func=boundmin&force_format=webp&q=80",
  "https://www.indianholiday.com/wordpress/wp-content/uploads/2025/06/Beaches-vs-Mountains-Which-Suits-Your-Mood.jpg",
  "https://static.toiimg.com/photo/111750047.cms",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgUMtKvrQyzHxTTnbXzvIFHvwUe6VTCVqolr4X3FGjn1uhEQ8W",
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ5VI4sgwGY9Z1uGtDCWcGJ6HujThFtJj8fIBC6MO023s4XumUO"
];

export const HeroSection = ({ onExplore, onViewMap }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[20px] overflow-hidden bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all ease-linear  duration-1000"
        style={{ backgroundImage: `url('${backgroundImages[currentIndex]}')`}}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-950/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
            REAL-TIME CROWD INTELLIGENCE
          </div>
          <h1 className="font-display text-5xl font-bold text-white lg:text-5xl">
            Travel Smart, <br />
            <span className="text-emerald-400">Not Crowded.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-200">
            Travel Smart. Experience More. Avoid the Crowd. Check crowd levels,
            discover hidden destinations, and enjoy better travel experiences.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#telemetry"
              onClick={onExplore}
              className="rounded-lg bg-[#1b6d24] px-6 py-3.5 font-semibold text-white shadow-lg  hover:bg-[#155a1d] inline-flex items-center justify-center transition-transform hover:scale-105"
            >
              Explore Destinations
            </a>
            <button
              onClick={onViewMap}
              className="rounded-lg border border-white/30 transition-transform hover:scale-105 bg-white/15 px-6 py-3.5 font-semibold text-white backdrop-blur-sm  hover:bg-white/25"
            >
              View Live Map
            </button>
          </div>
          <div className="flex items-center gap-2 pt-6 text-sm text-white/75">
            <Compass size={18} className="text-emerald-300" />
            Live intelligence for smarter, calmer journeys
          </div>
        </div>
      </div>
    </section>
  );
};