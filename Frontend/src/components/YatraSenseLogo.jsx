import React from "react";
import logoImg from "/assets/logo1.jpeg"; // Update this path to your actual image file

export const YatraSenseLogo = () => (
  <div className="flex items-center gap-2.5">
    <img 
      src={logoImg} 
      alt="Smart सफर Logo" 
      className="h-12 rounded-full w-auto object-contain mix-blend-multiply transition-transform hover:scale-110"
    />
    <span className="font-display font-bold text-2xl transition-transform hover:scale-110">
      <span className="text-[#136821]">Smart </span>
      <span className="text-[#f58220]">सफर</span>
    </span>
  </div>
);