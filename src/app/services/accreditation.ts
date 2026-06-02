import { inject, Injectable, signal } from '@angular/core';
import { Accreditation } from '../models/accreditation';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccreditationService {

  httpClient = inject(HttpClient) // injection du client pour pouvoir faire la requête
  notification = inject(NotificationService)

  readonly accreditationList = signal<Accreditation[]>([])

  get(id: number) {
    return this.httpClient
      .get<Accreditation>(environment.serverUrl + '/accreditation/' + id)
  }

  getAll() {
    return this.httpClient
      .get<Accreditation[]>(environment.serverUrl + '/accreditation/list')
      .pipe(tap(accreditationList => this.accreditationList.set(accreditationList))) // met à jour accreditationList avant de return le reultat de la requête
  }

  create(accreditation: Accreditation) {
    return this.httpClient
      .post(environment.serverUrl + "/accreditation", accreditation)
      .pipe(tap(resultat => this.getAll().subscribe())) // remet à jour la liste de composant à chaque create
  }

  update(accreditation: Accreditation, id: number) {
    return this.httpClient
      .put(environment.serverUrl + "/accreditation/" + id, accreditation)
      .pipe(tap(resultat => this.getAll().subscribe())) // remet à jour la liste de composant à chaque create
  }

  delete(id: number) {
    return this.httpClient
      .delete(environment.serverUrl + "/accreditation/" + id)
      .pipe(tap(resultat => this.getAll().subscribe())) // remet à jour la liste de composant à chaque create
  }
}

