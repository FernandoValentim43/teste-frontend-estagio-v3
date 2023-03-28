import React, { useContext } from "react";
import { Popup } from "react-leaflet";
import { EquipmentContext } from "../../App";
import { Equipament } from "../../class/Equipment";
import { InnerCard } from "../InnerCard/InnerCard";

interface PopUpProps {
  equipment: Equipament;
  index: number;
}

export const PopUpComponent: React.FC<PopUpProps> = ({ equipment, index }) => {
  //@ts-expect-error
  const [equipmentState, setEquipmentState] = useContext(EquipmentContext);

  return (
    <div onClick={() => setEquipmentState(index)}>
      <Popup offset={[10, -35]}>
        <InnerCard equipment={equipment} />
      </Popup>
    </div>
  );
};
