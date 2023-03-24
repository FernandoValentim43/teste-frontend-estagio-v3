import { EquipamentType } from "./EquipmentType";
import { Position } from "./Position";

export class Equipament {
  private _id: string;
  private _name: string;
  private _modelId: string;
  private type: EquipamentType;
  private _positions: Position[];

  constructor(
    id: string,
    name: string,
    modelId: string,
    positions: Position[]
  ) {
    this._id = id;
    this._name = name;
    this._modelId = modelId;
    this.type = new EquipamentType(modelId);
    this._positions = positions;
  }

  get typeId(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get modelId(): string {
    return this._modelId;
  }

  get typeName(): string {
    return this.type.name;
  }

  get positions(): Position[] {
    return [...this._positions];
  }


  //show all positions
  equipamentPositionsInfo() {
    this._positions.forEach(position => {
     console.log(`${this._name} AT ${position.positionInfo()}`)
    })
  }

  //show the most recent position
  getMostRecentPosition(): Position | null {
    if (this._positions.length === 0) {
      return null;
    }
    return this._positions[0];
  }

  honk() {
    console.log(this.name + " " + this.type.name);
  }
}
