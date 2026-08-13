import { Component, inject, OnInit } from '@angular/core';
import { LoanCard } from '../../layouts/loan-card/loan-card';
import { RouterLink } from '@angular/router';
import { LoanService } from '../../services/loan-service';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'home',
  imports: [LoanCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private authService = inject(AuthService)
  private loanService = inject(LoanService)

  protected user = this.authService.connectedUser

  protected ongoingLoans = this.loanService.userOngoingLoans
  protected plannedLoans = this.loanService.userPlannedLoans
  protected pastLoans = this.loanService.userPastLoans


  ngOnInit(): void {
    this.authService.getConnectedUser()
  }

}
