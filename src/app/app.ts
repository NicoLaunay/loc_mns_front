import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AccreditationService } from './services/accreditation';
import { AuthService } from './services/authservice';
import { MenuBurger } from './layouts/menu-burger/menu-burger';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, MenuBurger],
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

}
