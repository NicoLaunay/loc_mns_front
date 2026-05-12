import { Location } from "./location";
import { Model } from "./model";

type TestEquipment = {
    id: Number;
    name: String;
    icon: String;
}

type Equipment = {
    id: Number;
    name: String;
    condition: String;
    model: Model;
    location: Location;
}

type EquipmentWithLoans = Equipment & {
    loans: Array<LoanWithoutEquipment>
}