import { Type } from "./type";

type Model = {
    id: Number;
    name: String;
    description: String = "description";
    type: Type = Type();
    isComponent: Boolean = false;
    // documentations: Array<Documentation>;
    components: Array<Model> = [];
    // icon: String = ""
}