import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Type } from '../../models/type';
import { Model } from '../../models/model';

@Component({
  selector: 'new-loan-form',
  imports: [RouterLink],
  templateUrl: './new-loan-form.html',
  styleUrl: './new-loan-form.css',
})
export class NewLoanForm {
  equipmentTypes: Array<Type> = [
    {
      "id": 1,
      "name": "PC portable",
      "icon": ""
    },
    {
      "id": 2,
      "name": "Tour",
      "icon": ""
    },
    {
      "id": 3,
      "name": "Ecran",
      "icon": ""
    },
  ]
  equipmentModels: Array<Model> = [
    {
      "id": 1,
      "name": "Lenovo 45x",
      "description": "description",
      "type": 
      {
        "id": 1,
        "name": "PC portable",
        "icon": ""
      },
      "isComponent": false,
      // "documentations": "doc URL",
      "components": [],
    },
    {
      "id": 1,
      "name": "Lenovo 2S",
      "description": "description",
      "type": 
      {
        "id": 1,
        "name": "PC portable",
        "icon": ""
      },
      "isComponent": false,
      // "documentations": "doc URL",
      "components": [],
    },

  ]
}
