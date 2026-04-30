import { Location } from "./location";
import { Model } from "./model";

type Equipment = {
    id: Number;
    name: String;
    condition: String;
    model: Model;
    location: Location;
}