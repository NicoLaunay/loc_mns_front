import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

type JwtInfo = {sub: string, role: string}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  httpClient = inject(HttpClient)
  router = inject(Router)
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
      this.jwtInfo.set(body)
    }
  }

  logout() {
    this.jwtInfo.set(null)
    localStorage.removeItem("jwt")
    this.router.navigate(["/login"])
  }

}
