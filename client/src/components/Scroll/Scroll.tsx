import React, { useContext } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import { useRef } from "react";
import { EquipmentContext } from "../../App";

interface Props {
  components: React.ReactNode[];
  isChild: boolean;
}

export const ScrollAreaComp: React.FC<Props> = ({ components, isChild }) => {
  //@ts-ignore
  const [equipmentState, setEquipmentState] = useContext(EquipmentContext);

  const itemRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (equipmentState) {
      const index = components.indexOf(equipmentState);
      if (index !== -1) {
        const itemRef = useRef<HTMLDivElement>(null);
        const items = itemRef.current?.querySelectorAll("div");
        if (items && items[index]) {
          items[index].scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };
  
  return (
    <ScrollArea.Root className="ScrollAreaRoot">
      <ScrollArea.Viewport
        className={isChild ? "ScrollAreaChild" : "ScrollAreaViewport"}
      >
        {components.map((component, index) => (
          <div key={index} ref={index === 6 ? itemRef : null} onClick={handleClick}>
            {component}
          </div>
        ))}
        
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
      
    </ScrollArea.Root>
  );
};
