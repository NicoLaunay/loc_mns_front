import { Location } from "./location";
import { LoanWithoutEquipment } from "./loan";
import { Model, ModelBuilder } from "./model";
import { EquipmentStatus } from "../enums/equipment-status.enum";

export interface TestEquipment {
    id: number;
    name: string;
    icon: string;
}

export interface Equipment {
    id: number;
    name: string;
    condition: string;
    model: Model;
    location: Location;
}

export interface EquipmentWithLoans extends Equipment {
    loans: Array<LoanWithoutEquipment>;
    status: EquipmentStatus;
}

export class EquipmentBuilder implements EquipmentWithLoans {
    id: number = 0;
    name: string = 'unnamed equipment';
    condition: string = 'new';
    model: Model = new ModelBuilder().build();
    location: Location = { id: 1, name: 'undefined location' };
    loans: Array<LoanWithoutEquipment> = [];
    status: EquipmentStatus = EquipmentStatus.UNAVAILABLE;

    public withId(id: number): this {
        this.id = id;
        return this;
    }

    public withName(name: string): this {
        this.name = name;
        return this;
    }

    public withCondition(condition: string): this {
        this.condition = condition;
        return this;
    }

    public withModel(model: Model): this {
        this.model = model;
        return this;
    }

    public withLocation(location: Location): this {
        this.location = location;
        return this;
    }

    public addLoan(loan: LoanWithoutEquipment): this {
        this.loans.push(loan);
        return this;
    }

    public withLoans(loans: LoanWithoutEquipment[]): this {
        this.loans = loans;
        return this;
    }

    public build(): Equipment {
        return {
            id: this.id,
            name: this.name,
            condition: this.condition,
            model: this.model,
            location: this.location,
        };
    }

    public buildWithLoans(): EquipmentWithLoans {
        return {
            id: this.id,
            name: this.name,
            condition: this.condition,
            model: this.model,
            location: this.location,
            loans: this.loans,
            status: this.status
        };
    }
}