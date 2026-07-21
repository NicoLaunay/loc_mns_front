import { Component, inject } from '@angular/core';
import { LoanService } from '../../services/loan-service';
import { EquipmentCard } from '../../layouts/equipment-card/equipment-card';
import { Loan } from '../../models/loan';
import { UserService } from '../../services/user-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification';
import { AuthService } from '../../services/authservice';
import { firstValueFrom, forkJoin } from 'rxjs';

@Component({
  selector: 'edit-loan-validation',
  imports: [EquipmentCard],
  templateUrl: './edit-loan-validation.html',
  styleUrl: './edit-loan-validation.css',
})
export class EditLoanValidation {
  
  httpClient = inject(HttpClient)
  router = inject(Router)
  notification = inject(NotificationService)
  loanService = inject(LoanService)
  authService = inject(AuthService)
  userService = inject(UserService)

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
