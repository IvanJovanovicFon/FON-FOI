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
  ) { }

  status: boolean = false;

  ngOnInit() {
    console.log("123");
    this.moviesService.getWatchListStatus(this.data.id)
      .then((status: boolean) => {
        console.log(status, "status");
        this.status = status
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  closeModal() {
    // Trigger the movie refresh in the home component
    this.moviesService.triggerRefreshMovies();
  }

  addToWatchlist(movie: Movie): void {
    console.log("moviee: ", movie)
    this.moviesService.addToWatchlist(movie).subscribe(
      (response) => {
        console.log('Movie added to watchlist:', response);
        this.moviesService.getWatchListStatus(this.data.id)
          .then((status: boolean) => {
            console.log(status, "status");
            this.status = status
          })
          .catch((error) => {
            console.error('Error:', error);
            
          });
      },
      (error) => {
        console.error('Error adding movie to watchlist:', error);
      }
    );
  }

  toggleWatchlist(movie: Movie): void {
    if (this.status === true) {
      this.removeFromWatchlist(movie);
    } else {
      this.addToWatchlist(movie);
    }

  }

  removeFromWatchlist(movie: Movie): void {
    this.moviesService.removeFromWatchlist(movie).subscribe(
      (response) => {
        console.log('Movie removed from watchlist:', response);
        console.log("123");
        this.moviesService.getWatchListStatus(this.data.id)
          .then((status: boolean) => {
            console.log(status, "status");
            this.status = status
          })
          .catch((error) => {
            console.error('Error:', error);
            
          });
      },
      //   (error) => {
      //     console.error('Error removing movie from watchlist:', error);
      //   }
    );
  }
}