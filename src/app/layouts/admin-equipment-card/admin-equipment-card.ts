import { Component, input } from '@angular/core';
import { Equipment, EquipmentWithLoans } from '../../models/equipment';
import { TypeIconPipe } from "../../pipes/type-icon.pipe";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'admin-equipment-card',
  imports: [TypeIconPipe, MatIconModule],
  templateUrl: './admin-equipment-card.html',
  styleUrl: './admin-equipment-card.css',
})
export class AdminEquipmentCard {

  equipment = input<EquipmentWithLoans>();

}
