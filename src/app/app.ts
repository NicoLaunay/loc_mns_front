import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'

  
})
export class App {
  protected readonly title = signal('loc_mns_front');

  equipments = [
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
  
  user = {
    'id': 1,
    'name': "Pierre",
    'surname': "Chesnaye",
    'pseudo': "Pich",
    'email': "pierre.chesnaye@email.com",
    'avatar': "avatar.png",
  }
}
