import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authservice';

export const userGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService)
  
  // si user pas connecté, pas de jwt, donc on le redirige vers le login
  if(!authService.jwtInfo()?.role) {
    const router = inject(Router) 
    return router.parseUrl('/login')
  }
  
  return true;
};
