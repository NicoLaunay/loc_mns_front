import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Loan } from '../models/loan';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  httpClient = inject(HttpClient)
  readonly allLoans = signal<Loan[]>([])
  readonly showedLoans = signal<Loan[]>([])

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
      .get<Loan[]>(environment.serverUrl + '/loan/list')
      .pipe(tap(allLoans => this.showedLoans.set(allLoans))) // met à jour accreditationList avant de return le reultat de la requête

  }
}
