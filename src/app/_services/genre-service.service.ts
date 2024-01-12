import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenreServiceService {

  constructor() { }

  getAllGenres(){
    return  [{id:'1', name : 'Action'}, {id:'2', name : 'Comedy'}, {id:'3', name : 'Horror'}, {id:'4', name : 'Mystery'}]
  }
}
