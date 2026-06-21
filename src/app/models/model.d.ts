import { Type } from "./type.model";

type Model = {
    id: Number;
    name: String;
    description: String;
    type: Type = Type();
    isComponent: Boolean = false;
    // documentations: Array<Documentation>;
    components: Array<LightModel> = [];
    // icon: String = ""
}

type LightModel = {
    id: Number;
    name: String;
    description: String;
    type: Type = Type();
    isComponent: Boolean = false;

}