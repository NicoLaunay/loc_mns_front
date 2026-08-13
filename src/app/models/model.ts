import { Type, TypeBuilder } from "./type.model";

export interface LightModel {
    id: number;
    name: string;
    description: string;
    type: Type;
    isComponent: Boolean;
}

export interface Model extends LightModel {
    components: Array<LightModel>;
}

export class ModelBuilder implements Model {
    id: number = 0
    name: string = 'unnamed model';
    description: string = 'no description';
    type: Type = new TypeBuilder().build();
    isComponent: Boolean = false;
    components: Array<LightModel> = [];


    public build(): Model {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            type: this.type,
            isComponent: this.isComponent,
            components: this.components
        }
    }

    public buildLight(): LightModel {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            type: this.type,
            isComponent: this.isComponent,
        }
    }

    public withId(id: number): this {
        this.id = id;
        return this;
    }

    public withName(name: string): this {
        this.name = name;
        return this;
    }

    public withDescription(description: string): this {
        this.description = description;
        return this;
    }

    public withType(type: Type): this {
        this.type = type;
        return this;
    }

    public withIsComponent(isComponent: Boolean): this {
        this.isComponent = isComponent;
        return this;
    }

    public withComponents(components: Array<LightModel>): this {
        this.components = components;
        return this;
    }

    public addComponent(component: LightModel): this {
        this.components.push(component);
        return this;
    }

}

