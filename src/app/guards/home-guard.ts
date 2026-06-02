import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authservice';
import { inject } from '@angular/core';

export const homeGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  
  if (authService.jwtInfo()?.role === 'ADMIN' || authService.jwtInfo()?.role === 'OWNER') {
    const router = inject(Router)
    return router.parseUrl('/home-admin')
  }
  return true
}
