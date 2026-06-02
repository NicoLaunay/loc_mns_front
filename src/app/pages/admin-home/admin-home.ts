import { Component, inject } from '@angular/core';
import { EquipmentService } from '../../services/equipment-service';
import { AdminEquipmentCard } from "../../layouts/admin-equipment-card/admin-equipment-card";
import { DataClass } from '../../enums/data-class.enum';

import { NgClass } from '@angular/common';
import { UtilitiesService } from '../../services/utilities-service';
import { LoanService } from '../../services/loan-service';
import { AdminLoanCard } from '../../layouts/admin-loan-card/admin-loan-card';
@Component({
  selector: 'admin-home',
  imports: [AdminEquipmentCard, AdminLoanCard, NgClass],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome {

  private utilService = inject(UtilitiesService)

  // Exposer l'enum au template
  protected readonly dataClass = DataClass;
  protected readonly dataClassEntries = Object.entries(this.dataClass) as [String, DataClass][]

  protected showedClass: DataClass = DataClass.EQUIPMENT
  protected showedClassCreateFormUrl: String = this.getCreateFormUrl(this.showedClass)

  private equipmentService = inject(EquipmentService)
  private loanService = inject(LoanService)

  protected allEquipments = this.equipmentService.allEquipments
  protected showedLoans = this.loanService.showedLoans
  // protected allModels = this.ModelService.allModels

  ngOnInit(): void {
    this.equipmentService.getAll().subscribe()
    this.loanService.getAll().subscribe()
  }

  getCreateFormUrl(dataClass: DataClass): String {
    const enumKey = Object.keys(DataClass).find(
      key => DataClass[key as keyof typeof DataClass] === dataClass
    );

    if (enumKey) {
      let slugifiedClassName = this.utilService.slugify(enumKey)
      return `/edit-${slugifiedClassName}`

    } else {
      throw new Error("Catégorie inexistante");
    }
  }

  showList(dataClass: DataClass): void {
    try {
      this.showedClass = dataClass
      // this.showedClassName = this.getDataClassName(dataClass)
      this.showedClassCreateFormUrl = this.getCreateFormUrl(dataClass)
    } catch (error) {
      
    }
    
  }

}
