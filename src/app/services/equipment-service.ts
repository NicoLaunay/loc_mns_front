import { computed, inject, Injectable, signal } from '@angular/core';
import { TestEquipment, Equipment, EquipmentWithLoans } from '../models/equipment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  httpClient = inject(HttpClient)

  readonly allEquipments = signal<Equipment[]>([])
  readonly availableEquipmentsOfModel = signal<Equipment[]>([])
  readonly nbAvailableOfModel = computed(() => this.availableEquipmentsOfModel().length)

  // -------------------------------------------------------------------
  // METHODES COMMUNES
  // -------------------------------------------------------------------

  getBorrowedEquipments(userId:Number): Observable<Equipment[]> {
    return this.getAll()
  }

  getReservedEquipments(userId:Number): Observable<Equipment[]> {
    return this.getAll()
  }

  getAllOfModelAvailableOnPeriod(startDate: Date, endDate: Date, modelId: Number): Observable<Equipment[]> {
    const params = {
      start:  startDate.toISOString(),
      end: endDate.toISOString()
    }

    return this.httpClient
      .get<Equipment[]>(`http://localhost:8080/equipment/list-available-${modelId}`, { params })
      .pipe(tap(availableEquipments => this.availableEquipmentsOfModel.set(availableEquipments)))
  }

  // -------------------------------------------------------------------
  // METHODES ADMIN
  // -------------------------------------------------------------------

  getAll(): Observable<Equipment[]> {
    return this.httpClient
      .get<Equipment[]>('http://localhost:8080/equipment/list')
      .pipe(tap(allEquipments => this.allEquipments.set(allEquipments))) // met à jour accreditationList avant de return le reultat de la requête
  }
}
