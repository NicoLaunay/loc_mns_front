import { Component, inject } from '@angular/core';
import { EquipmentService } from '../../services/equipment-service';
import { AdminEquipmentCard } from "../../layouts/admin-equipment-card/admin-equipment-card";
import { DataClass } from '../../enums/data-class.enum';

import { NgClass } from '@angular/common';
import { UtilitiesService } from '../../services/utilities-service';
@Component({
  selector: 'admin-home',
  imports: [AdminEquipmentCard, NgClass],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {

  private utilService = inject(UtilitiesService)

  // Exposer l'enum au template
  protected readonly dataClass = DataClass;
  protected readonly dataClassEntries = Object.entries(this.dataClass) as [String, DataClass][]

  protected showedClass: DataClass = DataClass.EQUIPMENTS
  protected showedClassName: String = this.getDataClassName(this.showedClass)
  protected showedClassCreateFormUrl: String = this.getCreateFormUrl(this.showedClass)

  private equipmentService = inject(EquipmentService)

  protected allEquipments = this.equipmentService.equipmentList

  ngOnInit(): void {
    this.equipmentService.getAll().subscribe()
    console.log(this.allEquipments);
  }

  getCreateFormUrl(dataClass: DataClass): String {
    let slugifiedClassName = this.utilService.slugify(this.getDataClassName(dataClass))
    return `/new-${slugifiedClassName}`
  }

  getDataClassName(dataClass: DataClass): String {
    return dataClass.valueOf().slice(0, -1)
  }

  showList(dataClass: DataClass): void {
    this.showedClass = dataClass
    this.showedClassName = this.getDataClassName(dataClass)
    this.showedClassCreateFormUrl = this.getCreateFormUrl(dataClass)
  }

}
