import { Component, inject, Signal } from '@angular/core';
import { EquipmentService } from '../../services/equipment-service';
import { AdminEquipmentCard } from "../../layouts/admin-equipment-card/admin-equipment-card";
import { DataClass } from '../../enums/data-class.enum';
import { Equipment, TestEquipment } from '../../models/equipment';
import { Observable } from 'rxjs';
import { NgClass } from '@angular/common';
@Component({
  selector: 'admin-home',
  imports: [AdminEquipmentCard, NgClass],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {

  // Exposer l'enum au template
  protected readonly dataClass = DataClass;
  protected readonly dataClassEntries = Object.entries(this.dataClass) as [String, DataClass][]

  protected showedList: DataClass = DataClass.EQUIPMENTS

  private equipmentService = inject(EquipmentService)

  protected allEquipments = this.equipmentService.equipmentList

  ngOnInit(): void {
    this.equipmentService.getAll().subscribe()
    console.log(this.allEquipments);
  }

  showList(list: DataClass): void {
    this.showedList = list
  }

}
