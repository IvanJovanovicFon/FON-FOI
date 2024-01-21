import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../_services/movies.service';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent implements OnInit {
  allMovies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchText: string = '';

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    // Fetch all movies from the service
    this.moviesService.getAllMovies().subscribe(
      (movies) => {
        this.allMovies = movies;
        this.filteredMovies = movies; // Initially, display all movies
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  filterMovies(): void {
    // Filter movies based on the search text
    this.filteredMovies = this.allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}