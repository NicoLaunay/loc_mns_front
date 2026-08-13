import { Component, computed, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LoanWithoutUser } from '../../models/loan';
import { MatIconModule } from '@angular/material/icon';
import { TypeIconPipe } from '../../pipes/type-icon.pipe';

@Component({
  selector: 'loan-card',
  imports: [TypeIconPipe, RouterLink, MatIconModule],
  templateUrl: './loan-card.html',
  styleUrl: './loan-card.css',
})
export class LoanCard {
  loan = input<LoanWithoutUser>();
  
  isClosed = computed<boolean>(() => {
    const returnDate = this.loan()?.returnDate;
    return returnDate ? true : false;
  })
  isLate = computed<boolean>(() => {
    const endDate = this.loan()?.endDate;
    const returnDate = this.loan()?.returnDate;
    return endDate ? (endDate.getTime() < Date.now() && !returnDate) : false;
  })
    
}
