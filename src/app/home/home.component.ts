import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../_services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: any[] = []; // Update the type based on your actual movie structure

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.loadMovies();
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
