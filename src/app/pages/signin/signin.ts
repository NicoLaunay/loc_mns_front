import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { NotificationService } from '../../services/notification';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/authservice';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { passwordConfirmationValidator } from '../../validators/signin-validators';
import { BuildNewAppUser, NewAppUser } from '../../models/app-user.d';

@Component({ 
  selector: 'signin',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {

  formBuilder = inject(FormBuilder)
  httpClient = inject(HttpClient) // injection du client pour pouvoir faire la requête
  notification = inject(NotificationService)
  authService = inject(AuthService)
  userService = inject(UserService)
  router = inject(Router)

  formulaire = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email]],
      password1: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/),
      ]],
      password2: ['', [Validators.required]],
    }, 
    {validators: [passwordConfirmationValidator] });

  onSignin() {
    if (this.formulaire.valid) {
      const newUser: NewAppUser = new BuildNewAppUser()
        .withName(this.formulaire.controls.name.value)
        .withSurname(this.formulaire.controls.surname.value)
        .withEmail(this.formulaire.controls.email.value)
        .withPassword(this.formulaire.controls.password1.value)
        .build()

      console.log(newUser);

      this.userService.signin(newUser).subscribe()
    } else {
        console.log('pas valide');
    }
    
  }
}
