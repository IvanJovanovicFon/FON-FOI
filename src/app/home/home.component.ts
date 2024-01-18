import { Component, Inject, OnInit } from '@angular/core';
import { MoviesService } from '../_services/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from '../modal/my-modal/my-modal.component';
import { Movie } from '../model/movie';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: any[] = []; 

  constructor(private moviesService: MoviesService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadMovies();
    console.log(localStorage.getItem('currentUser'))
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
}

