import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Equipment } from '../../services/equipment.model';
import { HttpClient } from '@angular/common/http';
import { EquipmentService } from '../../services/equipment-service';

@Component({
  selector: 'equipment-detail',
  imports: [RouterLink],
  templateUrl: './equipment-detail.html',
  styleUrl: './equipment-detail.css',
})
export class EquipmentDetail {
  
}
