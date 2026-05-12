type AppUser = {
    id: number;
    name: string;
    surname: string;
    pseudo: string;
    email: string;
    accreditation: Accreditation;
    role: Role;
    avatarUrl: string;
}

type AppUserWithLoans = AppUser & {
    loans: Array<LoanWithoutUser>
}