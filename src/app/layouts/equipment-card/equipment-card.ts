import { Component, computed, input, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LoanWithoutUser } from '../../models/loan';

@Component({
  selector: 'equipment-card',
  imports: [RouterLink],
  templateUrl: './equipment-card.html',
  styleUrl: './equipment-card.css',
})
export class EquipmentCard {
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
