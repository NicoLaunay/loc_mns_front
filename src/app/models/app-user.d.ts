export interface AppUser {
    id: number;
    name: string;
    surname: string;
    pseudo: string;
    email: string;
    accreditation: Accreditation;
    role: Role;
    avatarUrl: string;
}

export interface AppUserWithLoans extends AppUser {
    loans: Array<LoanWithoutUser>
}