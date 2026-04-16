import { Injectable } from '@angular/core';
import { Equipment } from './equipment.model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  getBorrowedEquipments() {
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

  getReservedEquipments() {
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

}
