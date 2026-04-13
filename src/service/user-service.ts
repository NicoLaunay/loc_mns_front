import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUser() {
    const user = {
      'id': 1,
      'name': "Pierre",
      'surname': "Chesnaye",
      'pseudo': "Pich",
      'email': "pierre.chesnaye@email.com",
      'avatar': "avatar.png",
    }
    return user
  }
}
