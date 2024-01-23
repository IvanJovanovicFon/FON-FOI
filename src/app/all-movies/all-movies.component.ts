import { Component } from '@angular/core';
import { MoviesService } from '../_services/movies.service';
import { GenreServiceService } from '../_services/genre-service.service';
import { Genre } from '../model/genre';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css'],
})
export class AllMoviesComponent {
  searchTerm: string = '';
  selectedGenre: string = '';
  genres: Genre[] = [];
  movies: Movie[]=[];

  constructor(private movieService: MoviesService, private genreService: GenreServiceService) {}

  ngOnInit() {
      this.genreService.getAllGenres().subscribe(
      (genres: Genre[]) => {
        this.genres = genres;
      },
      (error) => {
        console.error('Error loading genres', error);
      }
    );
    this.loadMovies();
    console.log(this.movies)
  }

  loadMovies(){
    this.movieService.getMovies().subscribe((m)=>
    this.movies = m)
  }

  SearchMovies() {
    this.movies=[];
    this.movieService.searhMovies(this.searchTerm, this.selectedGenre).subscribe((movies) => {
      this.movies=movies;
      console.log('after  search', this.movies)
    });
  }

  onSubmit() {
    console.log(this.searchTerm, this.selectedGenre)
    this.SearchMovies();
  }
}