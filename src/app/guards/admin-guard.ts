import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authservice';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService)
  const router = inject(Router)
  
  // Si l'utilisateur n'est pas connecté
  if(!authService.jwtInfo()?.role) {
    return router.parseUrl('/login')
  }

  // Si l'utilisateur n'est pas ADMIN ou OWNER
  if(authService.jwtInfo()?.role != 'ADMIN' && authService.jwtInfo()?.role != 'OWNER') {
    const notification = inject(NotificationService)
    notification.open("Vous n'avez pas accès à cette page, connectez-vous à un autre compte", "error")
    return router.parseUrl('/login')
  }
  
  return true;
};
