import React from "react";
import logoImg from "/assets/logo1.png";

export const SmartSafarlogo = () => (
  <div className="flex items-center h-16 w-44 overflow-hidden">
    <img
      src={logoImg}
      alt="Smart सफर Logo"
      className="h-20 w-44 object-contain object-center"
    />
  </div>
);