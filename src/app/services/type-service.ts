import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Model } from '../models/model';
import { Observable, tap } from 'rxjs';
import { Type } from '../models/type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  httpClient = inject(HttpClient)

  readonly allTypes = signal<Type[]>([])

  getAll(): Observable<Type[]> {
    return this.httpClient
      .get<Type[]>(environment.serverUrl + '/type/list')
      .pipe(tap(types => this.allTypes.set(types)))
  }

  getEquipmentTypes(): Observable<Type[]> {
    return this.httpClient
      .get<Type[]>(environment.serverUrl + '/type/list')
      .pipe(tap(types => this.allTypes.set(types)))
  }
}
