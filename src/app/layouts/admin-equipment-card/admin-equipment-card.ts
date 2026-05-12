import { Component, input } from '@angular/core';
import { Equipment } from '../../models/equipment';

@Component({
  selector: 'admin-equipment-card',
  imports: [],
  templateUrl: './admin-equipment-card.html',
  styleUrl: './admin-equipment-card.css',
})
export class AdminEquipmentCard {

  equipment = input<Equipment>();

}
