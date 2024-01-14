import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../model/genre';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreServiceService {

  constructor(private http: HttpClient) { }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>('http://localhost:8080/api/v1/genres');
  }
  
}
