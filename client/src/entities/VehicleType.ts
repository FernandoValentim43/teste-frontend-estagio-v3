enum NameEnum {
  CargoTruck = "a3540227-2f0e-4362-9517-92f41dabbfdf",
  Harvester = "a4b0c114-acd8-4151-9449-7d12ab9bf40f",
  Claw = "9c3d009e-0d42-4a6e-9036-193e9bca3199",
}

export class VehicleType {
  private _id: string;
  private _name: string;

  constructor(id: string) {
    this._id = id;
    this._name = this.getNameFromId(id);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  private getNameFromId(id: string): string {
    switch (id) {
      case NameEnum.CargoTruck:
        return "Cargo Truck";
      case NameEnum.Harvester:
        return "Harvester";
      case NameEnum.Claw:
        return "Claw";
      default:
        throw new Error(`Invalid vehicle type ID: ${id}`);
    }
  }
}
