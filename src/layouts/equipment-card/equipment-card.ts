import { Component, input, Input } from '@angular/core';
import { Equipment } from '../../service/data-import/equipment.model';

@Component({
  selector: 'equipment-card',
  imports: [],
  templateUrl: './equipment-card.html',
  styleUrl: './equipment-card.css',
})
export class EquipmentCard {
  equipment = input<Equipment>();
}
