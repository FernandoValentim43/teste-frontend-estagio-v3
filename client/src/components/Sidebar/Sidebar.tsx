//@ts-nocheck
import { Card } from "../Card/Card";
import { ScrollAreaComp } from "../Scroll/Scroll";
import { Select } from "../Select/Select";

import { useState } from "react";


interface SidebarProps {
  equipments: Equipament[];
}

/* export const Sidebar: React.FC<SidebarProps> = ({equipments}) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipament | null>(null);

  const NamesArray = equipments.map((equipment) => equipment.equipName);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTypeId = event.target.value;
    const selectedEquip = equipments.find((equip) => equip.typeId === selectedTypeId) ?? null;
    setSelectedEquipment(selectedEquip);
  };

  let componentsArray = null;
  if (selectedEquipment !== null) {
    componentsArray = [<Card key={selectedEquipment.equipId + selectedEquipment.typeId} equipment={selectedEquipment} />];
  } else {
    componentsArray = equipments.map((equipment) => (
      <Card key={equipment.equipId + equipment.typeId} equipment={equipment} />
    ));
  }

  const statesArray = [
    StateEnum.Working,
    StateEnum.Idle,
    StateEnum.Maintenance,
  ];
  
  const modelsArray = [
    TypeEnum.CargoTruck,
    TypeEnum.Harvester,
    TypeEnum.Claw,
  ];
 
  

  return (
    <div className="sidebar">
      <div className="search">
        <Select placeholder="Select equipment" options={NamesArray} onChange={handleSelectChange} />
        <Select  placeholder={"Model:"}  options={modelsArray} onChange={handleSelectChange} selectType={"model"}  />
        <Select placeholder={"State:"}  options={statesArray} onChange={handleSelectChange} selectType={"state"}   />
      </div>
      <ScrollAreaComp components={componentsArray} isChild={false} />
    </div>
  );
}; */

export const Sidebar: React.FC<SidebarProps> = ({ equipments }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipament | null>(
    null
  );
  const [componentsArray, setComponentsArray] = useState<JSX.Element[] | null>(
    null
  );

  const namesArray = equipments.map((equipment) => equipment.equipName);

  const handleTypeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTypeId = event.target.value;
    const selectedEquips = equipments.filter(
      (equip) => equip.typeId === selectedTypeId
    );
    if (selectedEquips.length > 0) {
      setSelectedEquipment(null);
      const equipCards = selectedEquips.map((equipment) => (
        <Card
          key={equipment.equipId + equipment.typeId}
          equipment={equipment}
        />
      ));
      setComponentsArray(equipCards);
    } else {
      setSelectedEquipment(null);
      const equipCards = equipments.map((equipment) => (
        <Card
          key={equipment.equipId + equipment.typeId}
          equipment={equipment}
        />
      ));
      setComponentsArray(equipCards);
    }
  };

  const handleStateSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedState = event.target.value;
    console.log(selectedState)
    const selectedEquips = equipments.filter(
      (equip) => equip.lastState === selectedState
    );
    if (selectedEquips.length > 0) {
      setSelectedEquipment(null);
      const equipCards = selectedEquips.map((equipment) => (
        <Card
          key={equipment.equipId + equipment.typeId}
          equipment={equipment}
        />
      ));
      setComponentsArray(equipCards);
    } else {
      setSelectedEquipment(null);
      setComponentsArray([]);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEquipName = event.target.value;
    const selectedEquip =
      equipments.find((equip) => equip.equipName === selectedEquipName) ?? null;
    setSelectedEquipment(selectedEquip);
    if (selectedEquip !== null) {
      setComponentsArray([
        <Card
          key={selectedEquip.equipId + selectedEquip.typeId}
          equipment={selectedEquip}
        />,
      ]);
    } else {
      const equipCards = equipments.map((equipment) => (
        <Card
          key={equipment.equipId + equipment.typeId}
          equipment={equipment}
        />
      ));
      setComponentsArray(equipCards);
    }
  };

  if (selectedEquipment === null && componentsArray === null) {
    const equipCards = equipments.map((equipment) => (
      <Card key={equipment.equipId + equipment.typeId} equipment={equipment} />
    ));
    setComponentsArray(equipCards);
  }

  const modelsArray = [TypeEnum.CargoTruck, TypeEnum.Harvester, TypeEnum.Claw];
  const StatesArray = [StateEnum.Working, StateEnum.Idle, StateEnum.Maintenance];


  return (
    <div className="sidebar">
      <div className="search">
        <Select
          placeholder="Select equipment"
          options={namesArray}
          onChange={handleSelectChange}
        />
        <Select
          placeholder={"State:"}
          options={StatesArray}
          onChange={handleStateSelectChange}
          selectType={"state"}
        />
        <Select
          placeholder={"Model:"}
          options={modelsArray}
          onChange={handleTypeSelectChange}
          selectType={"model"}
        />
      </div>
      <ScrollAreaComp components={componentsArray || []} isChild={false} />
    </div>
  );
};


class Equipament {
  private _equipId: string;
  private _equipName: string;
  private _typeId: string;
  private _typeName: EquipamentType;
  private _positions: Position[];
  private _states: State[];

  constructor(
    id: string,
    name: string,
    modelId: string,
    positions: Position[],
    states: State[]
  ) {
    this._equipId = id;
    this._equipName = name;
    this._typeId = modelId;
    this._typeName = new EquipamentType(modelId);
    this._positions = positions;
    this._states = states;
  }

  get equipId(): string {
    return this._equipId;
  }

  get equipName(): string {
    return this._equipName;
  }

  get typeId(): string {
    return this._typeId;
  }

  get typeName(): string {
    return this._typeName.name;
  }

  get positions(): Position[] {
    return [...this._positions];
  }

  get states(): State[] {
    return [...this._states];
  }

  get lastState() {
    return this._states[this._states.length - 1].stateId;
  }

  //get the most recent position
  getMostRecentPosition(): number[] | null {
    if (this._positions.length === 0) {
      return null;
    }
    return this._positions[this._positions.length - 1].positionInfo();
  }

  //get the most recent state
  getMostRecentState(): string[] | string {
    if (this._states.length === 0) {
      return "default";
    }
    return this._states[this._states.length - 1].positionDateInfo();
  }

  //get the most recent date
  getMostRecentDate(): string {
    if (this._states.length === 0) {
      return "default";
    }
    return this._states[this._states.length - 1].stateDate;
  }

  honk() {
    console.log(this._equipName + " " + this._typeName.name);
  }
}

enum TypeEnum {
  CargoTruck = "a3540227-2f0e-4362-9517-92f41dabbfdf",
  Harvester = "a4b0c114-acd8-4151-9449-7d12ab9bf40f",
  Claw = "9c3d009e-0d42-4a6e-9036-193e9bca3199",
}

class EquipamentType {
  private _id: string;
  private _name: string;

  constructor(id: string) {
    this._id = id;
    this._name = EquipamentType.getNameFromId(id);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  static getNameFromId(id: string): string {
    switch (id) {
      case TypeEnum.CargoTruck:
        return "Caminhão de carga";
      case TypeEnum.Harvester:
        return "Harvester";
      case TypeEnum.Claw:
        return "Garra traçadora";
      default:
        throw new Error(`Invalid Equipament type ID: ${id}`);
    }
  }
}

class Position {
  private _date: string;
  private _lat: number;
  private _lon: number;

  constructor(date: string, lat: number, lon: number) {
    this._date = date;
    this._lat = lat;
    this._lon = lon;
  }

  get date(): string {
    return this._date;
  }

  get latitude(): number {
    return this._lat;
  }

  get longitude(): number {
    return this._lon;
  }

  positionInfo() {
    return [this._lat, this._lon];
  }
}

enum StateEnum {
  Working = "0808344c-454b-4c36-89e8-d7687e692d57",
  Idle = "baff9783-84e8-4e01-874b-6fd743b875ad",
  Maintenance = "03b2d446-e3ba-4c82-8dc2-a5611fea6e1f",
}

class State {
  private _id: string;
  private _stateName: string;
  private _date: string;

  get stateId(): string {
    return this._id;
  }

  get stateName(): string {
    return this._stateName;
  }

  get stateDate(): string {
    return this._date;
  }

  positionDateInfo() {
    return [this._date, this._stateName, this._id];
  }

  constructor(id: string, date: string) {
    this._id = id;
    this._date = date;
    this._stateName = State.getNameStateId(id);
  }

  static getNameStateId(id: string): string {
    switch (id) {
      case StateEnum.Working:
        return "Operando";
      case StateEnum.Idle:
        return "Parado";
      case StateEnum.Maintenance:
        return "Manutenção";
      default:
        throw new Error(`Invalid vehicle state ID: ${id}`);
    }
  }
}


export {}