import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { EquipmentService } from '../../services/equipment-service';


@Component({
  selector: 'equipment-detail',
  imports: [RouterLink],
  templateUrl: './equipment-detail.html',
  styleUrl: './equipment-detail.css',
})
export class EquipmentDetail implements OnInit {
  @Input() id!: string; // correspond au paramètre :id de la route

  equipmentService = inject(EquipmentService)

  protected equipment = this.equipmentService.focusedOnEquipment

  ngOnInit():void {
    this.equipmentService.loadById(Number(this.id)).subscribe()
    console.log(this.equipment());
    
  }
}
