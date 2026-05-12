import { Component, inject, OnInit, signal } from '@angular/core';
import { EquipmentCard } from '../../layouts/equipment-card/equipment-card';
import { EquipmentService } from '../../services/equipment-service';
import { Equipment } from '../../services/equipment.model';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home',
  imports: [EquipmentCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  borrowedEquipments: Array<Equipment> = []
  reservedEquipments: Array<Equipment> = []

  // APPEL DU SERVICE EquipmentService
  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {

    this.borrowedEquipments = this.equipmentService.getBorrowedEquipments(0);
    this.reservedEquipments = this.equipmentService.getReservedEquipments(0);

  }

}
