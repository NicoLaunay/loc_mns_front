import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Model } from '../models/model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  httpClient = inject(HttpClient)

  readonly allModels = signal<Model[]>([])
  readonly allOfType = signal<Model[]>([])

  getAll(): Observable<Model[]> {
    return this.httpClient
      .get<Model[]>('http://localhost:8080/model/list')
      .pipe(tap(models => this.allModels.set(models)))
  }

  getAllOfType(typeId: Number): Observable<Model[]> {
    return this.httpClient
      .get<Model[]>(`http://localhost:8080/model/of-type-${typeId}`)
      .pipe(tap(models => this.allOfType.set(models)))
  }
}
