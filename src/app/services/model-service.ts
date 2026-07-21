import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Model } from '../models/model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  httpClient = inject(HttpClient)

  readonly allModels = signal<Model[]>([])
  readonly allOfType = signal<Model[]>([])

  getAll(): Observable<Model[]> {
    return this.httpClient
      .get<Model[]>(environment.serverUrl + '/model/list')
      .pipe(tap(models => this.allModels.set(models)))
  }

  getAllOfType(typeId: Number): void {
    this.httpClient
      .get<Model[]>(environment.serverUrl + `/model/of-type-${typeId}`)
      .pipe(tap(models => this.allOfType.set(models)))
      .subscribe()
  }
}
