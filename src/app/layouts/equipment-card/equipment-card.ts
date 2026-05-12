import { Component, input, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Equipment } from '../../models/equipment';

@Component({
  selector: 'equipment-card',
  imports: [RouterLink],
  templateUrl: './equipment-card.html',
  styleUrl: './equipment-card.css',
})
export class EquipmentCard {
  equipment = input<Equipment>();
}
