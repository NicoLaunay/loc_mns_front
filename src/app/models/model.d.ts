import { Type } from "./type";

type Model = {
    id: Number;
    name: String;
    description: String = "description";
    type: Type = Type();
    isComponent: Boolean = false;
    // documentations: Array<Documentation>;
    components: Array<LightModel> = [];
    // icon: String = ""
}

type LightModel = {
    id: Number;
    name: String;
    description: String = "description";
    type: Type = Type();
    isComponent: Boolean = false;

}