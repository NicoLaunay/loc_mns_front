import { Loan, LoanWithoutUser } from './loan';

/**
 * Convertit les dates reçues du backend (chaînes ISO) en objets Date.
 * Le JSON ne transporte que des chaînes de caractères : cette fonction
 * réaligne les données brutes sur le typage TypeScript déclaré (Date).
 */
export function mapLoanDates<T extends LoanWithoutUser>(raw: T): T {
  return {
    ...raw,
    startDate: new Date(raw.startDate),
    endDate: new Date(raw.endDate),
    returnDate: raw.returnDate ? new Date(raw.returnDate) : null,
  };
}

export function mapLoanListDates<T extends LoanWithoutUser>(rawList: T[]): T[] {
  return rawList.map(mapLoanDates);
}