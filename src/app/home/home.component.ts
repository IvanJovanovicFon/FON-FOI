import { Component, Inject, OnInit } from '@angular/core';
import { MoviesService } from '../_services/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from '../modal/my-modal/my-modal.component';
import { Movie } from '../model/movie';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: any[] = []; 
  watchlist: any[] = [];
  user: string = "";
  refreshSubscription: Subscription;

  constructor(private moviesService: MoviesService, public dialog: MatDialog) {
    this.refreshSubscription = this.moviesService.refreshMovies$.subscribe(() => {
      this.refreshMovies();
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  ngOnDestroy() {
    // Unsubscribe from the observable to avoid memory leaks
    this.refreshSubscription.unsubscribe();
  }

  refreshMovies() {
    this.getWatchlist();
  }


  ngOnInit(): void {
    this.loadMovies();
    let token = localStorage.getItem('currentUser') 
    console.log('token: ', token)
    if(token !== null){
    console.log("decoded: ", this.getDecodedAccessToken(token))
    this.user =  this.getDecodedAccessToken(token).firstName;
    console.log(this.user)
    this.getWatchlist()
    }
  }
  getWatchlist(){
    this.moviesService.getWatchlist().subscribe((watch)=>{
      this.watchlist = watch;
    })
  }


  openDialog(movie: Movie): void {
    this.dialog.open(MyModalComponent, {
      width: '400px',
      data: movie
    });
  }


  private loadMovies() {
    this.moviesService.getAllMovies().subscribe(
      (data) => {
        this.movies = data;
      },
      (error) => {
        console.error('Error loading movies', error);
      }
    );
  }

  getDetails(movie: Movie){
    this.moviesService.getMovieDetails(movie).subscribe(
      (movieDetails: Movie) => {
        console.log(movieDetails);
        this.openDialog(movieDetails);
      },
      (error) => {
        console.error(error);
      }
      );
  }
}

