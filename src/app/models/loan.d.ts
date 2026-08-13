import { Equipment } from "./equipment"

export interface LoanDetails {
    id: Number | null,
    startDate: Date,
    endDate: Date,
    returnDate: Date | null
}

export interface LoanWithoutEquipment extends LoanDetails{
    user: AppUser,
}

export interface LoanWithoutUser extends LoanDetails{
    equipment: Equipment,
}

export interface Loan extends LoanDetails {
    equipment: Equipment,
    user: AppUser
}

export interface NewLoan {
    user: AppUser,
    equipment: Equipment,
    startDate: Date,
    endDate: Date,
}


