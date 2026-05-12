import { Component, inject, OnInit, signal } from '@angular/core';
import { EquipmentCard } from '../../layouts/equipment-card/equipment-card';
import { EquipmentService } from '../../services/equipment-service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Equipment } from '../../models/equipment';

@Component({
  selector: 'home',
  imports: [EquipmentCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  // APPEL DU SERVICE EquipmentService
  private equipmentService = inject(EquipmentService)

  protected borrowedEquipments = this.equipmentService.equipmentList
  protected reservedEquipments = this.equipmentService.equipmentList


  ngOnInit(): void {

    this.equipmentService.getBorrowedEquipments(0).subscribe();
    this.equipmentService.getReservedEquipments(0).subscribe();

  }

}
