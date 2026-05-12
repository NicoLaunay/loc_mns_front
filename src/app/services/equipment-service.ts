import { inject, Injectable } from '@angular/core';
import { Equipment } from './equipment.model';
import { EquipmentWithLoans } from '../models/equipment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {

  // -------------------------------------------------------------------
  // METHODES COMMUNES
  // -------------------------------------------------------------------

  getBorrowedEquipments(userId:Number): Array<Equipment> {
    const borrowedEquipments: Array<Equipment> = [
    {
      'id': 1,
      'name': "pc 1",
      'icon': ""
    },
    {
      'id': 2,
      'name': "pc 2",
      'icon': ""
    }
  ]
    return borrowedEquipments
  }

  getReservedEquipments(userId:Number): Array<Equipment> {
    const reservedEquipments: Array<Equipment> = [
    {
      'id': 3,
      'name': "souris 1",
      'icon': ""
    },
    {
      'id': 4,
      'name': "pc 3",
      'icon': ""
    }
  ]
    return reservedEquipments
  }

  // -------------------------------------------------------------------
  // METHODES ADMIN
  // -------------------------------------------------------------------

  
  // getAllEquipments(userId:Number): Array<Equipment> {
  //   let httpClient = inject(HttpClient)
  //   const borrowedEquipments: Array<Equipment> = [
  //       httpClient
  //         .get<Equipment[]>("http://localhost:8080/equipment/list")
  // ]
  //   return borrowedEquipments
  // }

  getAllEquipments(): Array<Equipment> {
    const equipments: Array<Equipment> = [
    {
      'id': 1,
      'name': "pc 1",
      'icon': ""
    },
    {
      'id': 2,
      'name': "pc 2",
      'icon': ""
    },
    {
      'id': 3,
      'name': "souris 1",
      'icon': ""
    },
    {
      'id': 4,
      'name': "pc 3",
      'icon': ""
    }
  ]
  return equipments
  }
}
