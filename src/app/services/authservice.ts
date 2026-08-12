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

    // Si pas de token, on s'assure que jwtInfo est bien vide
    if (!jwt) {
      this.jwtInfo.set(null)
      return
    }

    try {
      const bodyBase64 = jwt.split('.')[1]
      const body = JSON.parse(atob(bodyBase64))

      // body.exp = propriété du token, en secondes, Date.now() en millisecondes
      const isExpired = !body.exp || body.exp * 1000 < Date.now()

      if (isExpired) {
        localStorage.removeItem('jwt')
        this.jwtInfo.set(null)
        return
      }

      this.jwtInfo.set({
        email: body.sub,
        role: body.role
      })

    } catch (e) {
      // Nettoyage si token illisible ou corrompu
      localStorage.removeItem('jwt')
      this.jwtInfo.set(null)
    }
  }

  logout() {
    this.jwtInfo.set(null)
    this.connectedUser.set(null)
    localStorage.removeItem("jwt")
    this.router.navigate(["/login"])
  }

}
