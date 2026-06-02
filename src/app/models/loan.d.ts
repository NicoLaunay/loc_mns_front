import { Equipment } from "./equipment"

type Loan = {
    id: Number,
    user: AppUser,
    equipment: Equipment,
    startDate: Date,
    endDate: Date,
    returnDate: Date
}