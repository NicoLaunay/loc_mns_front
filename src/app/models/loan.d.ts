import { Equipment } from "./equipment"

export interface LoanWithoutUser {
    id: Number | null,
    equipment: Equipment,
    startDate: Date,
    endDate: Date,
    returnDate: Date | null
}

export interface Loan extends LoanWithoutUser {
    user: AppUser
}

export interface NewLoan {
    user: AppUser,
    equipment: Equipment,
    startDate: Date,
    endDate: Date,
}


