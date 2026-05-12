import { Component } from '@angular/core';
import { Equipment } from '../../services/equipment.model';
import { EquipmentService } from '../../services/equipment-service';
import { AdminEquipmentCard } from "../../layouts/admin-equipment-card/admin-equipment-card";
import { DataClass } from '../../models/data-class.enum';

@Component({
  selector: 'admin-home',
  imports: [AdminEquipmentCard],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {

  // Exposer l'enum au template
  protected readonly DataClass = DataClass;
  protected showedList: DataClass = DataClass.EQUIPMENTS

  constructor(private equipmentService: EquipmentService) {}
  allEquipments: Equipment[] = []

  ngOnInit(): void {
    this.allEquipments = this.equipmentService.getAllEquipments();
  }

  showList(list: DataClass): void {
    this.showedList = list
  }



}
