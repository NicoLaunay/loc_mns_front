import { Component, input, Input } from '@angular/core';
import { Equipment } from '../../services/equipment.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'equipment-card',
  imports: [RouterLink],
  templateUrl: './equipment-card.html',
  styleUrl: './equipment-card.css',
})
export class EquipmentCard {
  equipment = input<Equipment>();
}
