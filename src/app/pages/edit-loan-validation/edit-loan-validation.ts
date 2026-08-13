import { Component, inject } from '@angular/core';
import { LoanService } from '../../services/loan-service';
import { LoanCard } from '../../layouts/loan-card/loan-card';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification';
import { AuthService } from '../../services/authservice';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'edit-loan-validation',
  imports: [LoanCard],
  templateUrl: './edit-loan-validation.html',
  styleUrl: './edit-loan-validation.css',
})
export class EditLoanValidation {
  
  httpClient = inject(HttpClient)
  router = inject(Router)
  notification = inject(NotificationService)
  loanService = inject(LoanService)
  authService = inject(AuthService)

  readonly newLoans = this.loanService.newLoans
  readonly connectedUser = this.authService.connectedUser

  async onValidation() {
    await Promise.all(
      this.newLoans().map(loan => firstValueFrom(this.loanService.create(loan)))
    );
    await this.authService.getConnectedUser();
    this.notification.open('Nouveaux prêts validés', 'valid');
    this.router.navigateByUrl('/edit-loan');
  }
}
