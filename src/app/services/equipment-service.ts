import { computed, inject, Injectable, signal } from '@angular/core';
import { Equipment, EquipmentWithLoans } from '../models/equipment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoanService } from './loan-service';
import { mapStatus } from '../models/equipment.mapper';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  httpClient = inject(HttpClient)
  loanService = inject(LoanService)

  readonly allEquipments = signal<EquipmentWithLoans[]>([])
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

  getAll(): Observable<EquipmentWithLoans[]> {
    return this.httpClient
      .get<EquipmentWithLoans[]>(environment.serverUrl + '/equipment/list')
      .pipe(tap(allEquipments => this.allEquipments.set(mapStatus(allEquipments)))) // met à jour accreditationList avant de return le reultat de la requête
  }

  // getAllWithLoans(): Observable<EquipmentWithLoans[]> {
  //   return this.httpClient
  //     .get<EquipmentWithLoans[]>(environment.serverUrl + '/equipment/list')
  //     .pipe(
  //       tap(equipments => this.allEquipmentsWithLoans.set(
  //         equipments.map(equipment => {
  //           equipment.loans = this.loanService.getAllByEquipmentId(equipment.id).subscribe()
  //           equipment.loans.sort((loanA, loanB) => Number(loanB.startDate) - Number(loanA.startDate))
  //           return equipment
  //         })
  //       ))
  //     ) // met à jour accreditationList avant de return le reultat de la requête
  // }
}
