import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { NotificationService } from '../../services/notification';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/authservice';
import { Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'login',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  formBuilder = inject(FormBuilder)
  httpClient = inject(HttpClient) // injection du client pour pouvoir faire la requête
  notification = inject(NotificationService)
  authService = inject(AuthService)
  userService = inject(UserService)
  router = inject(Router)

  formulaire = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.email]],
    password: ['', [Validators.required]],
  })

  onLogin() {
    if (this.formulaire.valid) {
      this.authService
        .login(this.formulaire.value as { email: String, password: String }) // la 2e partie sers à forcer le type, pour assurer à angular qu'il n'y aura pas de null
        .subscribe({
          // Si ça marche
          next: (jwt) => {
            this.notification.open('Connexion réussie', 'valid')
            this.router.navigateByUrl('/home')
          },
          // Si erreur
          error: (err) => {
            this.notification.open('Mauvais Login/Mot de passe', 'error')
          }
      })
    }
  }
}
