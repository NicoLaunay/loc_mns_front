import { Component, inject, OnInit } from '@angular/core';
import { EquipmentCard } from '../../layouts/equipment-card/equipment-card';
import { EquipmentService } from '../../services/equipment-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home',
  imports: [EquipmentCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  // APPEL DU SERVICE EquipmentService
  private equipmentService = inject(EquipmentService)

  protected borrowedEquipments = this.equipmentService.allEquipments
  protected reservedEquipments = this.equipmentService.allEquipments


  ngOnInit(): void {

    this.equipmentService.getBorrowedEquipments(0).subscribe();
    this.equipmentService.getReservedEquipments(0).subscribe();

  }

}
