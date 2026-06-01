import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AccreditationService } from './services/accreditation';
import { AuthService } from './services/authservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
  
})
export class App {

// COMMENT PERMETTRE A UN ELEMENT DE APP D'ETRE UPDATABLE EN TEMPS REEL SANS RECHARGER LA PAGE

  accreditationService = inject(AccreditationService)

  authService = inject(AuthService)

  ngOnInit() {
    this.accreditationService.getAll()
  }

  logout() {
    this.authService.logout()
  }
}
