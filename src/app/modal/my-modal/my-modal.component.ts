import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MoviesService } from 'src/app/_services/movies.service';
import { Movie } from 'src/app/model/movie';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css'],
})
export class MyModalComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    public dialogRef: MatDialogRef<MyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie
  ) {}

  
  ngOnInit() {
  }


  watchlist : Movie[] = [];

  addToWatchlist(movie: Movie): void {

    console.log("moviee: ", movie)
    this.moviesService.addToWatchlist(movie).subscribe(
      (response) => {
        console.log('Movie added to watchlist:', response);
        this.watchlist.push(movie)
      },
      (error) => {
        console.error('Error adding movie to watchlist:', error);
      }
    );
   }

   toggleWatchlist(movie: Movie): void {
    const index = this.watchlist.findIndex((m) => m.id === movie.id);

    if (index !== -1) {
      this.removeFromWatchlist(index, movie);
    } else {
      this.addToWatchlist(movie);
    }
  }

  
  removeFromWatchlist(index: number, movie: Movie): void {
    this.moviesService.removeFromWatchlist(movie).subscribe(
      (response) => {
        console.log('Movie removed from watchlist:', response);
        this.watchlist.splice(index, 1);
      },
      (error) => {
        console.error('Error removing movie from watchlist:', error);
      }
    );
  }

  isInWatchlist(movie: Movie): boolean {
    return this.watchlist.some((m) => m.id === movie.id);
  }
}