import { Component } from '@angular/core';
import { EquipmentCard } from '../../layouts/equipment-card/equipment-card';

@Component({
  selector: 'home',
  imports: [EquipmentCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
