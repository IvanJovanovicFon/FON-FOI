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
  //     const result: Movie[] = [{
  //     id: "123",
  //     title: "Lord of the Rings",
  //     date_release: new Date('05-05-2003'),

  //     genre: {primary:{id:'1', name:'SF'}, secondary:[{id:'2', name: 'Hystory'}, {id:'3', name: 'War'}]},
  //     director: 'Director Name',
  //     actors: ['Actor 1', 'Actor 2'],
  //     description: 'Movie Description',
  //     duration: 120,
  //  url:'https://upload.wikimedia.org/wikipedia/en/f/fc/The_Lord_of_the_Rings%2C_T2T_%282002%29.jpg'},
  //   {
  //     id: "123",
  //     title: "Lord of the Rings",
  //     date_release: new Date('05-05-2003'),
  //     genre: {primary:{id:'1', name:'SF'}, secondary:[{id:'2', name: 'Hystory'}, {id:'3', name: 'War'}]},
  //     director: 'Director Name',
  //     actors: ['Actor 1', 'Actor 2'],
  //     description: 'Movie Description',
  //     duration: 120,
  //     url: 'https://pyxis.nymag.com/v1/imgs/5d4/f6e/c6aeaba039ba41d69a9dbce8c3523ec471-11-gollum.rsquare.w400.jpg'
  //   }];
  //   return of(result);


    //otkomentarisi ovu liniju
    return this.http.get<Movie[]>('http://localhost:8080/api/v1/movies/recommendations');
  } 

  getMovieDetails(movie:Movie): Observable<Movie>{
    // const result: Movie = {
    //   id: "123",
    //   title: "Lord of the Rings",
    //   date_release: new Date('05-05-2003'),

    //   genre: {primary:{id:'1', name:'SF'}, secondary:[{id:'2', name: 'Hystory'}, {id:'3', name: 'War'}]},
    //   director: 'Director Name',
    //   actors: ['Actor 1', 'Actor 2'],
    //   description: 'Movie Description',
    //   duration: 120,
    //   url:'https://upload.wikimedia.org/wikipedia/en/f/fc/The_Lord_of_the_Rings%2C_T2T_%282002%29.jpg'}
    // return of(result);


    //otkomentarisi ovu liniju
    return this.http.get<Movie>(`http://localhost:8080/api/v1/movies/${movie.id}`);
  }

  addToWatchlist(movie: Movie): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/v1/movies/watchlist/${movie.id}`, { movie });
  }

  removeFromWatchlist(movie: Movie): Observable<any> {
    const url = `http://localhost:8080/api/v1/movies/watchlist/remove/${movie.id}`;
    return this.http.delete<any>(url);
  }
  getWatchListStatus(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get(`http://localhost:8080/api/v1/movies/watchlist/exists/${id}`, { observe: 'response' })
        .subscribe(
          (response) => {
            console.log(response,"response");
            if (response.status === 200) {
              console.log('Movie is in the watchlist');
              resolve(true);
            } else {
              console.log('Movie is not in the watchlist');
              resolve(false);
            }
          },
          (error) => {
            console.log('Movie is not in the watchlist123');
            resolve(false);
            console.error('Error fetching watchlist status:', error);
            reject(error);
          }
        );
    });
  }

searhMovies(title: string, genre: string): Observable<Movie[]> {
  const url = 'http://localhost:8080/api/v1/movies/search';
  if((title===null||title==='')&&(genre!==null||genre!=='')){
    return this.http.post<Movie[]>(url, { genre});
  }
  if((genre===null||genre==='')&&(title!==null||title!=='')){
    return this.http.post<Movie[]>(url, {title});
  }

  return this.http.post<Movie[]>(url, {genre,title});
}
getWatchlist():Observable<Movie[]>{
  const url = 'http://localhost:8080/api/v1/movies/watchlist';
  return this.http.get<Movie[]>(url);
}


getMovies(): Observable<Movie[]> {
//   const result: Movie[] = [{
//     id: "123",
//     title: "Lord of the Rings",
//     date_release: new Date('05-05-2003'),

//     genre: {primary:{id:'1', name:'SF'}, secondary:[{id:'2', name: 'Hystory'}, {id:'3', name: 'War'}]},
//     director: 'Director Name',
//     actors: ['Actor 1', 'Actor 2'],
//     description: 'Movie Description',
//     duration: 120,
//  url:'https://upload.wikimedia.org/wikipedia/en/f/fc/The_Lord_of_the_Rings%2C_T2T_%282002%29.jpg'},
//   {
//     id: "123",
//     title: "Lord of the Rings",
//     date_release: new Date('05-05-2003'),
//     genre: {primary:{id:'1', name:'SF'}, secondary:[{id:'2', name: 'Hystory'}, {id:'3', name: 'War'}]},
//     director: 'Director Name',
//     actors: ['Actor 1', 'Actor 2'],
//     description: 'Movie Description',
//     duration: 120,
//     url: 'https://pyxis.nymag.com/v1/imgs/5d4/f6e/c6aeaba039ba41d69a9dbce8c3523ec471-11-gollum.rsquare.w400.jpg'
//   }];
//   return of(result);

  const url = 'http://localhost:8080/api/v1/movies';
  return this.http.get<Movie[]>(url);
}
}