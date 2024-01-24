import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Movie } from '../model/movie';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }
  private refreshMoviesSource = new BehaviorSubject<boolean>(false);
  refreshMovies$ = this.refreshMoviesSource.asObservable();

  triggerRefreshMovies() {
    this.refreshMoviesSource.next(true);
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('http://localhost:8080/api/v1/movies/recommendations');
  } 

  getMovieDetails(movie:Movie): Observable<Movie>{
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
  const url = 'http://localhost:8080/api/v1/movies';
  return this.http.get<Movie[]>(url);
}
}