import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Loan, LoanWithoutUser } from '../models/loan';
import { environment } from '../../environments/environment';
import { Equipment } from '../models/equipment';
import { UserService } from './user-service';
import { AuthService } from './authservice';
import { AppUser } from '../models/app-user';
import { mapLoanListDates } from '../models/loan.mapper';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  httpClient = inject(HttpClient)
  authService = inject(AuthService)
  userService = inject(UserService)

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
  
  newStartDate = signal<Date | null>(null)
  newEndDate = signal<Date | null>(null)
  newReturnDate = signal<Date | null>(null)

  newLoans = signal<Loan[]>([])

  constructor() {
    effect(() => {
      const user = this.connectedUser()
      if (user) {
        this.getAllByUserId(user.id).subscribe(loans => this.userLoans.set(loans))
      } else {
        this.userLoans.set([])
      }
    })
  }

  // -------------------------------------------------------------------
  // METHODES COMMUNES
  // -------------------------------------------------------------------

  //DEVENU OBSOLETE SAUF CAS PARTICULIER
  loadConnectedUserLoans(): void {
    const user = this.authService.connectedUser()
    if (!user) {
      throw new Error('Aucun utilisateur connecté')
    }
    this.getAllByUserId(user.id).subscribe(loans =>
      this.userLoans.set(loans))
  }

  // -------------------------------------------------------------------
  // METHODES ADMIN
  // -------------------------------------------------------------------

  getAllByUserId(id: Number): Observable<LoanWithoutUser[]> {
    return this.httpClient
      .get<LoanWithoutUser[]>(environment.serverUrl + `/loan/user${id}`)
      .pipe(map(loans => mapLoanListDates(loans)))
  }

  getOngoingByUserId(id: Number): Observable<Loan[]> {
    return this.httpClient
      .get<Loan[]>(environment.serverUrl + `/loan/user${id}/ongoing`)
      // .pipe(tap(loans => this.userOngoingLoans.set(loans)))
  }

  getPlannedyUserId(id: Number): Observable<Loan[]> {
    return this.httpClient
      .get<Loan[]>(environment.serverUrl + `/loan/user${id}/planned`)
      // .pipe(tap(loans => this.userPlannedLoans.set(loans)))
  }

  getPastyUserId(id: Number): Observable<Loan[]> {
    return this.httpClient
      .get<Loan[]>(environment.serverUrl + `/loan/user${id}/past`)
      // .pipe(tap(loans => this.userPastLoans.set(loans)))
  }

  getAll(): Observable<Loan[]> {
    return this.httpClient
      .get<Loan[]>(`${environment.serverUrl}/loan/list`)
      .pipe(tap(allLoans => this.showedLoans.set(allLoans))) // met à jour accreditationList avant de return le reultat de la requête
  }

  create(loan: Loan): Observable<Loan> {
    return this.httpClient
    .post<Loan>(
      `${environment.serverUrl}/loan`,
      loan
    )
    .pipe(tap((resultat) => this.getAll().subscribe()))
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

  // update(loan: Loan, id: number): void {
  //   this.httpClient
  //   .put<Loan>(`${environment.serverUrl}/loan/${id}`, loan)
  //   .pipe(tap((resultat) => this.getAll().subscribe()))
  // }
}
