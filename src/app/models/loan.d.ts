import { Equipment } from "./equipment"

type Loan = {
    id: Number | null,
    user: AppUser,
    equipment: Equipment,
    startDate: Date,
    endDate: Date,
    returnDate: Date | null
}

type NewLoan = {
    user: AppUser,
    equipment: Equipment,
    startDate: Date,
    endDate: Date,
}