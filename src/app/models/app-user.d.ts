import { Accreditation } from "./accreditation";

export interface AppUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    accreditation: Accreditation;
    role: Role;
    avatarUrl: string;
}

export interface AppUserWithLoans extends AppUser {
    loans: Array<LoanWithoutUser>
}

export interface NewAppUser {
    name: string | null;
    surname: string | null;
    email: string;
    password: string;
    role: Role;
    accreditation: Accreditation;
}

export class BuildNewAppUser implements NewAppUser {
    name: string | null = 'Unknown';
    surname: string | null = 'Unknown';
    email: string = 'Unknown';
    password: string = 'Unknown';
    role: Role = {id: 3, name: 'USER'};
    accreditation: Accreditation = {
        id: 2,
        borrowedTypes: [],
    };

    build(): NewAppUser {
        return {
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
            role: this.role,
            accreditation: this.accreditation,
        }
    }

    withName(name: string): this {
        this.name = name
        return this
    }

    withSurname(surname: string): this {
        this.surname = surname
        return this
    }

    withEmail(email: string): this {
        this.email = email
        return this
    }

    withPassword(password: string): this {
        this.password = password
        return this
    }
}