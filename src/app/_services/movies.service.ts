import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../model/movie';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:8080/api/v1/movies');
    //const result = [{id:'1', name:'Action'}, {id:'2', name:'Romance'}, {id:'3', name:'Horror'}, {id:'4', name:'SF'},{id:'5', name:'Hystory'}];
    //return of(result);
  }

}
