import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root', // indique que le service est dispo au niveau de l'application entière (singleton), ou non
})

export class NotificationService {

  snackBar = inject(MatSnackBar)

  open(message : string, type: 'info'|'warning'|'error'|'valid' = 'info') {
    
    this.snackBar.open(
      message, 
      undefined, // éventuel message pour le bouton fermeture de la notif
      {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'valid'
      }
    )
    
  }
}
