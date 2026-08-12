import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { NotificationService } from "../services/notification";
import { Router } from "@angular/router";
import { AuthService } from "../services/authservice";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

    const notification = inject(NotificationService)
    const router = inject(Router)
    const authService = inject(AuthService)

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            switch (error.status) {
            case 400:
                notification.open(error.error.message, 'error')
                console.error('Données invalides :', error.error.message);
                break;
            case 401:
                if (req.url.endsWith('/login')) {
                    // 401 sur la requête de connexion → identifiants incorrects
                    notification.open('Email ou mot de passe incorrect', 'error')
                } else {
                    // 401 sur une requête protégée → token expiré ou invalide
                    notification.open('Session expirée, veuillez vous reconnecter', 'error')
                    authService.logout()
                }
                break;
            case 404:
                router.navigate(['/not-found']);
                break;
            default:
                notification.open(error.error.message, 'error')
                console.error('Erreur serveur :', error.error.message);
            }

            // Propagation de l'erreur pour que les composants puissent aussi réagir si besoin
            return throwError(() => error);
        })
    );
}
