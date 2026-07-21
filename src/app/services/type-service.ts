import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiType, mapTypeWithIcon, Type } from '../models/type.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  httpClient = inject(HttpClient)

  readonly allTypes = signal<Type[]>([])
  readonly borrowableTypes = signal<Type[]>([])
  readonly typeIcons: Record<number | "default", string> = {
    default: "",
    1: ""
  }

  getAll(): void {
    this.httpClient
      .get<ApiType[]>(environment.serverUrl + '/type/list')
      .pipe(tap(types => this.allTypes.set(types.map(mapTypeWithIcon))))
      .subscribe()
  }

  getEquipmentTypes(): void {
    this.httpClient
      .get<ApiType[]>(environment.serverUrl + '/type/list')
      .pipe(tap(types => this.allTypes.set(types.map(mapTypeWithIcon))))
      .subscribe()
  }

  getBorrowableTypes(): void {
    this.httpClient
      .get<ApiType[]>(environment.serverUrl + '/type/borrowable')
      .pipe(tap(types => this.borrowableTypes
        .set(types.map(mapTypeWithIcon))
      ))
      .subscribe()
  }
}
