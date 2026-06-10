import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

type JwtInfo = {email: string, role: string}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  httpClient = inject(HttpClient)
  router = inject(Router)

  connectedUserEmail = signal<String | null>(null)
  connectedUser = signal<AppUser | null>(null)

  readonly jwtInfo = signal<JwtInfo | null>(null)

  constructor() {
    this.decodeJwt()
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

  getConnectedUser(): void {

    if (!this.jwtInfo()?.email) {
      console.log("erreur attribution user");
      
      throw new Error('Utilisateur non connecté : aucun JWT valide.')
    }

    // Try catch à mettre ?
    this.httpClient
      .get<AppUser>(environment.serverUrl + `/user/me`)
      .pipe(tap(connectedUser => {

        console.log(connectedUser);
        
        this.connectedUser.set(connectedUser)
      }))
      .subscribe()
  }

}
