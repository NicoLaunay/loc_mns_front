import { computed, inject, Injectable, signal } from '@angular/core';
import { TestEquipment, Equipment, EquipmentWithLoans } from '../models/equipment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  httpClient = inject(HttpClient)

  readonly allEquipments = signal<Equipment[]>([])
  readonly availableEquipmentsOfModel = signal<Equipment[]>([])
  readonly nbAvailableOfModel = computed(() => this.availableEquipmentsOfModel().length)
  readonly focusedOnEquipment = signal<Equipment|null>(null)

  // -------------------------------------------------------------------
  // METHODES COMMUNES
  // -------------------------------------------------------------------

  loadById(id:Number): Observable<Equipment> {
    return this.httpClient
      .get<Equipment>(environment.serverUrl + `/equipment/${id}`)
      .pipe(tap(equipment => this.focusedOnEquipment.set(equipment)))
  }

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
      .get<Equipment[]>(environment.serverUrl + `/equipment/list-available-${modelId}`, { params })
      .pipe(tap(availableEquipments => this.availableEquipmentsOfModel.set(availableEquipments)))
  }

  // -------------------------------------------------------------------
  // METHODES ADMIN
  // -------------------------------------------------------------------

  getAll(): Observable<Equipment[]> {
    return this.httpClient
      .get<Equipment[]>(environment.serverUrl + '/equipment/list')
      .pipe(tap(allEquipments => this.allEquipments.set(allEquipments))) // met à jour accreditationList avant de return le reultat de la requête
  }
}
