import { useContext } from "react";
import { EquipmentContext } from "../../App";
import { Equipament } from "../../class/Equipment";
import { Card } from "../Card/Card";
import { ScrollAreaComp } from "../Scroll/Scroll";
import { Search } from "../Search/Search";



interface SidebarProps {
  equipments: Equipament[];
}

export const Sidebar: React.FC<SidebarProps> = ({equipments}) => {
  //@ts-ignore
  const [equipmentState, setEquipmentState] = useContext(EquipmentContext);
  
  const componentsArray = equipments.map((equipment, index) => (
    <Card key={equipment.equipId + equipment.typeId} equipment={equipment} index={index} />
  ));

  return (
    <div className="sidebar">
      <p>{equipmentState}</p>
      <Search />
      <ScrollAreaComp components={componentsArray} isChild={false} />
    </div>
  );
};
