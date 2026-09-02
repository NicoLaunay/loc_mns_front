import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './authservice';
import { AppUser, AppUserWithLoans, NewAppUser } from '../models/app-user';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  httpClient = inject(HttpClient)

  signin(user: NewAppUser): Observable<AppUser> {
    return this.httpClient
      .post<AppUser>(`${environment.serverUrl}/sign-in`, user)
  }

emailExists(email: string): Observable<boolean> {
  const params = new HttpParams().set('email', email);
  return this.httpClient
    .get<boolean>(`${environment.serverUrl}/user/email`, { params });
}
}
