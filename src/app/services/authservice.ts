import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppUser, AppUserWithLoans } from '../models/app-user';
import { UserService } from './user-service';

type JwtInfo = {email: string, role: string}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  httpClient = inject(HttpClient)
  router = inject(Router)
  userService = inject(UserService)

  private connectedUserEmail = signal<String | null>(null)
  readonly connectedUser = signal<AppUserWithLoans|null>(null)

  readonly jwtInfo = signal<JwtInfo | null>(null)

  constructor() {
    this.decodeJwt()
  }

  async getConnectedUser() {

    if (!this.jwtInfo()?.email) {
      console.log("erreur attribution user");
      throw new Error('Utilisateur non connecté : aucun JWT valide.')
    }

    const user = await firstValueFrom(this.httpClient
      .get<AppUserWithLoans>(environment.serverUrl + `/user/me`))

      this.connectedUser.set(user)


      console.log('connected user out: ')
      console.log(this.connectedUser())
      
  }

  login(credentials: { email: String, password: String }) {
    return this.httpClient.post(
      environment.serverUrl + '/login',
      credentials,
      {responseType: 'text'
    })
    .pipe(
      tap(jwt => {
        localStorage.setItem('jwt', jwt)
        this.decodeJwt()
        this.getConnectedUser()
      })
    )
  }

  decodeJwt() {
    const jwt = localStorage.getItem('jwt')

    if (jwt) {
      const jwtParts = jwt.split('.')
      const bodyBase64 = jwtParts[1]
      const bodyJson = atob(bodyBase64)
      const body = JSON.parse(bodyJson)
      this.jwtInfo.set({
        email: body.sub,
        role: body.role
      })      
    }
  }

  logout() {
    this.jwtInfo.set(null)
    this.connectedUser.set(null)
    localStorage.removeItem("jwt")
    this.router.navigate(["/login"])
  }

}
