import { Component, inject, OnInit } from '@angular/core';
import { EquipmentCard } from '../../layouts/equipment-card/equipment-card';
import { RouterLink } from '@angular/router';
import { LoanService } from '../../services/loan-service';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'home',
  imports: [EquipmentCard, RouterLink],
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
