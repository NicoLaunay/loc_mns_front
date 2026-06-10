import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Loan } from '../models/loan';
import { environment } from '../../environments/environment';
import { Equipment } from '../models/equipment';
import { UserService } from './user-service';
import { AuthService } from './authservice';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  httpClient = inject(HttpClient)
  authService = inject(AuthService)

  readonly allLoans = signal<Loan[]>([])
  readonly showedLoans = signal<Loan[]>([])

  readonly connectedUser = this.authService.connectedUser
  
  newStartDate = signal<Date | null>(null)
  newEndDate = signal<Date | null>(null)
  newReturnDate = signal<Date | null>(null)

  newLoans = signal<Loan[]>([])

  // -------------------------------------------------------------------
  // METHODES COMMUNES
  // -------------------------------------------------------------------


  // -------------------------------------------------------------------
  // METHODES ADMIN
  // -------------------------------------------------------------------

  getAllByUserId(id: Number): Observable<Loan[]> {
    return this.httpClient
      .get<Loan[]>(environment.serverUrl + `/loan/user${id}`)
      .pipe(tap(loans => this.showedLoans.set(loans)))
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
