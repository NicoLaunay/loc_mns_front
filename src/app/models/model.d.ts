import { Type } from "./type";

type Model = {
    id: Number;
    name: String;
    description: String;
    type: Type;
    isComponent: Boolean;
    // documentations: Array<Documentation>;
    components: Array<Model>;
}