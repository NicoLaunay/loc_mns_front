import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Loan, LoanWithoutUser } from '../models/loan';
import { environment } from '../../environments/environment';
import { Equipment } from '../models/equipment';
import { AuthService } from './authservice';
import { AppUser } from '../models/app-user';
import { mapLoanListDates } from '../models/loan.mapper';

@Injectable({
  providedIn: 'root',
})

export class LoanService {
  httpClient = inject(HttpClient)
  authService = inject(AuthService)

  readonly allLoans = signal<Loan[]>([])
  readonly showedLoans = signal<Loan[]>([])
  readonly userLoans = signal<LoanWithoutUser[]>([])
  readonly userOngoingLoans = computed<LoanWithoutUser[]>(() => 
    this.userLoans().filter(loan => 
      !loan.returnDate && 
      loan.startDate.getTime() < Date.now()
    ))
  readonly userPlannedLoans = computed<LoanWithoutUser[]>(() =>
    this.userLoans().filter(loan => 
      loan.startDate.getTime() > Date.now()
    ))
  readonly userPastLoans = computed<LoanWithoutUser[]>(() => 
    this.userLoans().filter(loan => 
      loan.returnDate
    ))
  readonly connectedUser = this.authService.connectedUser

  newLoans = signal<Loan[]>([])

  constructor() {
    effect(() => {
      const user = this.connectedUser()
      if (user) {
        this.getAllConnectedUserLoans().subscribe(loans => this.userLoans.set(loans))
      } else {
        this.userLoans.set([])
      }
    })
  }

  // -------------------------------------------------------------------
  // METHODES COMMUNES
  // -------------------------------------------------------------------

  getAllConnectedUserLoans(): Observable<LoanWithoutUser[]> {
    return this.httpClient
      .get<LoanWithoutUser[]>(environment.serverUrl + `/loan/me`)
      .pipe(map(loans => mapLoanListDates(loans)))
  }

  // -------------------------------------------------------------------
  // METHODES ADMIN
  // -------------------------------------------------------------------

  getAllByUserId(id: Number): Observable<LoanWithoutUser[]> {
    return this.httpClient
      .get<LoanWithoutUser[]>(environment.serverUrl + `/loan/user/${id}`)
      .pipe(map(loans => mapLoanListDates(loans)))
  }

  getAll(): Observable<Loan[]> {
    return this.httpClient
      .get<Loan[]>(`${environment.serverUrl}/loan/list`)
      .pipe(tap(allLoans => this.showedLoans.set(allLoans))) // met à jour accreditationList avant de return le reultat de la requête
  }

  create(loan: Loan): Observable<Loan> {
    return this.httpClient
      .post<Loan>(`${environment.serverUrl}/loan`, loan)
  }

  buildNewLoan(user: AppUser, equipment: Equipment, startDate: Date, endDate: Date, returnDate: Date | null = null): Loan {
    return {
        id: null,
        user: user,
        equipment: equipment,
        startDate: startDate,
        endDate: endDate,
        returnDate: returnDate
      }
  }

  update(loan: Loan, id: number): Observable<Loan> {
    return this.httpClient
    .put<Loan>(`${environment.serverUrl}/loan/${id}`, loan)
    .pipe(tap((resultat) => this.getAll().subscribe()))
  }
}
