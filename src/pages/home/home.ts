import { Component } from '@angular/core';
import { EquipmentCard } from '../../layouts/equipment-card/equipment-card';
import { EquipmentService } from '../../service/equipment-service';
import { Equipment } from '../../service/equipment.model';

@Component({
  selector: 'home',
  imports: [EquipmentCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // APPEL DU SERVICE EquipmentService
  constructor(private equipmentService: EquipmentService) {}
  
  borrowedEquipments: Array<Equipment> = []
  ngOnInit(): void {
    this.borrowedEquipments = this.equipmentService.getBorrowedEquipments();
  }

}
