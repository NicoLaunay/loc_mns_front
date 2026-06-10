import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../services/authservice';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'menu-burger',
  imports: [RouterLink],
  templateUrl: './menu-burger.html',
  styleUrl: './menu-burger.css',
})
export class MenuBurger {

  authService = inject(AuthService)
  router = inject(Router)

  isMenuOpen = signal(false)
 
  currentUrl = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects),
      startWith(this.router.url)
    ),
    { initialValue: this.router.url }
  );

  isOnLoginPage = computed(
    () => this.currentUrl() === '/login'
  );


  // ngOnInit() {
  //   // Ferme automatiquement le menu burger lors d'une redirection MARCHE PAS
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     this.isMenuOpen.set(false);
  //   });
  // }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu(): void {
    this.isMenuOpen.set(false)
  }

  logout() {
    // this.isOnLoginPage()
    this.closeMenu()
    this.authService.logout()
  }
}