import { Component, input } from '@angular/core';

@Component({
  selector: 'admin-loan-card',
  imports: [],
  templateUrl: './admin-loan-card.html',
  styleUrl: './admin-loan-card.css',
})
export class AdminLoanCard {
  loan = input<Loan>();
}
