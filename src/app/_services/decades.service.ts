import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../model/genre';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecadesService {

  constructor(private http: HttpClient) { }

  getAllDecades(): Observable<number[]> {
    const result: number[] = [1980, 1990, 2000, 2010, 2020];
    return of(result);
  }
}
