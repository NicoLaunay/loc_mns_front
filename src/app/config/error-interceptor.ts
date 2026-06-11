import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { NotificationService } from "../services/notification";
import { Router } from "@angular/router";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

    const notification = inject(NotificationService)
    const router = inject(Router)

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            switch (error.status) {
            case 400:
                notification.open(error.error.message, 'error')
                console.error('Données invalides :', error.error.message);
                break;
            // case 401:
            //     // Token expiré → on redirige vers la page de connexion
            //     router.navigate(['/login']);
            //     break;
            // case 403:
            //     router.navigate(['/forbidden']);
            //     break;
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
