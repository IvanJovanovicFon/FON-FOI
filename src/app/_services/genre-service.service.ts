import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../model/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreServiceService {

  constructor(private http: HttpClient) { }

  getAllGenres(){
    return  [{id:'1', name : 'Action'}, {id:'2', name : 'Comedy'}, {id:'3', name : 'Horror'}, {id:'4', name : 'Mystery'}, {id:'5', name : 'Romance'}]
   // return this.http.get<Genre[]>('http://localhost:8080/api/v1/users/genre');
  }
}
