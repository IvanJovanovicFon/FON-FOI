import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../model/genre';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreServiceService {

  constructor(private http: HttpClient) { }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>('http://localhost:8080/api/v1/genres');
    //const result = [{id:'1', name:'Action'}, {id:'2', name:'Romance'}, {id:'3', name:'Horror'}, {id:'4', name:'SF'},{id:'5', name:'Hystory'}];
   // return of(result);
  }
 
  
}
