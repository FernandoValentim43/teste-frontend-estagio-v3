import React from "react";
import { Equipament } from "../../class/Equipment";
import { Accordeon } from "../Accordeon/Accordeon";
import { InnerCard } from "../InnerCard/InnerCard";

interface CardProps {
  equipment: Equipament;
  index: number;
}

export const Card: React.FC<CardProps> = ({ equipment, index }) => {
  return (
    <div className="card">
      <div className="card-header">
        <InnerCard equipment={equipment} index={index} />
      </div>

      <div className="card-content">
        <Accordeon equipment={equipment} />
      </div>
    </div>
  );
};
